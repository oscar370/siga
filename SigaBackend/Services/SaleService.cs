using System.Security.Claims;
using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Enums;
using SigaBackend.Models;

namespace SigaBackend.Services;

public interface ISaleService
{
  Task<Results<Created<SaleBasicDto>, BadRequest<string>, UnauthorizedHttpResult>> CreateSaleAsync(SaleCreateDto dto, ClaimsPrincipal claims);

  Task<Ok<PagedList<SaleBasicDto>>> GetSalesAsync(PaginationParams queryParams);

  Task<Results<Ok<SaleBasicDto>, NotFound<string>>> GetSaleByIdAsync(int Id);

  Task<Ok<PagedList<SaleDetailsBasicDto>>> GetSaleDetailsBySaleAsync(int Id, PaginationParams queryParams);

  Task<Results<Ok<int>, NotFound<string>, BadRequest<string>>> CancelSaleAsync(int Id);
}

public class SaleService(SigaDbContext context) : ISaleService
{
  private readonly SigaDbContext _context = context;

  public async Task<Results<Created<SaleBasicDto>, BadRequest<string>, UnauthorizedHttpResult>> CreateSaleAsync(SaleCreateDto dto, ClaimsPrincipal claims)
  {
    var userIdString = claims.FindFirstValue(ClaimTypes.NameIdentifier);

    if (!int.TryParse(userIdString, out int userId))
    {
      return TypedResults.Unauthorized();
    }

    using var transaction = await _context.Database.BeginTransactionAsync();

    try
    {
      var operationDateUtc = dto.OperationDate.ToUniversalTime();
      var totalAmount = dto.Items.Sum(i => i.Quantity * i.UnitPrice);

      var sale = new Sale
      {
        OperationDate = operationDateUtc,
        TotalAmount = totalAmount,
        Status = Status.Completed,
        UserId = userId,
        ReferenceInvoice = $"TKT-{operationDateUtc:yyyyMMdd}-{Guid.NewGuid().ToString()[..4].ToUpper()}"
      };

      _context.Sales.Add(sale);
      await _context.SaveChangesAsync();

      var details = new List<SaleDetails>();

      foreach (var item in dto.Items)
      {
        var detail = new SaleDetails
        {
          QuantityRequested = item.Quantity,
          UnitSellingPrice = item.UnitPrice,
          SaleId = sale.Id,
          ProductId = item.ProductId,
          Transactions = []
        };

        decimal remainingQuantity = item.Quantity;

        var availableLots = await _context.Lots
            .Where(l => l.ProductId == item.ProductId && l.AvailableQuantity > 0)
            .OrderBy(l => l.EntryDate)
            .ToListAsync();

        foreach (var lot in availableLots)
        {
          if (remainingQuantity <= 0) break;

          decimal quantityToTake = Math.Min(remainingQuantity, lot.AvailableQuantity);

          lot.AvailableQuantity -= quantityToTake;
          remainingQuantity -= quantityToTake;

          detail.Transactions.Add(new SaleTransaction
          {
            QuantitySold = quantityToTake,
            UnitCostApplied = lot.UnitCost,
            LotId = lot.Id,
            SaleDetailsId = detail.Id
          });
        }

        if (remainingQuantity > 0)
        {
          return TypedResults.BadRequest($"Insufficient stock for product ID {item.ProductId}. {remainingQuantity} units remaining");
        }

        details.Add(detail);
      }

      _context.SaleDetails.AddRange(details);

      await _context.SaveChangesAsync();

      await transaction.CommitAsync();

      var result = sale.Adapt<SaleBasicDto>();

      return TypedResults.Created($"/api/sales/{result.Id}", result);
    }
    catch (DbUpdateConcurrencyException)
    {
      return TypedResults.BadRequest("The inventory was modified during the transaction. Please try again");
    }
    catch (Exception ex)
    {
      return TypedResults.BadRequest($"Error processing the sale: {ex.Message}");
    }
  }

  public async Task<Ok<PagedList<SaleBasicDto>>> GetSalesAsync(PaginationParams queryParams)
  {
    var query = _context.Sales
      .AsNoTracking();

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(s => s.ReferenceInvoice.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var sales = await query
      .OrderBy(s => s.OperationDate)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<SaleBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<SaleBasicDto>(
      sales,
      totalCount,
      queryParams.PageNumber,
      queryParams.PageSize
    );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Results<Ok<SaleBasicDto>, NotFound<string>>> GetSaleByIdAsync(int Id)
  {
    var sale = await _context.Sales
      .AsNoTracking()
      .Where(s => s.Id == Id)
      .ProjectToType<SaleBasicDto>()
      .FirstOrDefaultAsync();

    if (sale is null) return TypedResults.NotFound("The sale could not be found");

    return TypedResults.Ok(sale);
  }

  public async Task<Ok<PagedList<SaleDetailsBasicDto>>> GetSaleDetailsBySaleAsync(int Id, PaginationParams queryParams)
  {
    var query = _context.SaleDetails
      .AsNoTracking()
      .Where((sd) => sd.SaleId == Id);

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(sd => sd.Sale.ReferenceInvoice.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var products = await query
      .OrderBy(sd => sd.Sale.OperationDate)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<SaleDetailsBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<SaleDetailsBasicDto>(
     products,
     totalCount,
     queryParams.PageNumber,
     queryParams.PageSize
   );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Results<Ok<int>, NotFound<string>, BadRequest<string>>> CancelSaleAsync(int Id)
  {
    var sale = await _context.Sales
        .Where(s => s.Id == Id)
        .FirstOrDefaultAsync();

    if (sale is null) return TypedResults.NotFound("The sale could not be found");


    if (sale.Status == Status.Cancelled) return TypedResults.BadRequest("The sale has already been canceled");

    using var transaction = await _context.Database.BeginTransactionAsync();

    try
    {

      foreach (var detail in sale.Details)
      {
        foreach (var saleTransaction in detail.Transactions)
        {
          var lot = saleTransaction.Lot;
          lot?.AvailableQuantity += saleTransaction.QuantitySold;
        }
      }

      sale.Status = Status.Cancelled;

      await _context.SaveChangesAsync();
      await transaction.CommitAsync();

      return TypedResults.Ok(Id);
    }
    catch (DbUpdateConcurrencyException)
    {
      return TypedResults.BadRequest("The inventory was modified by another transaction during the cancellation");
    }
    catch (Exception ex)
    {
      return TypedResults.BadRequest($"Error processing the cancellation: {ex.Message}");
    }
  }
}