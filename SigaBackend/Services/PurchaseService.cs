using System.Security.Claims;
using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Enums;
using SigaBackend.Models;

namespace SigaBackend.Services;

interface IPurchaseService
{
  Task<Results<Created<PurchaseBasicDto>, BadRequest<string>, UnauthorizedHttpResult>> CreatePurchaseAsync(PurchaseCreateDto dto, ClaimsPrincipal claims);

  Task<Ok<PagedList<PurchaseBasicDto>>> GetPurchasesAsync(PaginationParams queryParams);

  Task<Results<Ok<PurchaseExtendedDto>, NotFound<string>>> GetPurchaseByIdAsync(int Id);

  Task<Ok<PagedList<LotBasicDto>>> GetLotsByPurchaseAsync(int Id, PaginationParams queryParams);

  Task<Results<Ok<int>, BadRequest<string>>> CancelPurchaseAsync(int Id);
}

public class PurchaseService(SigaDbContext context) : IPurchaseService
{
  private readonly SigaDbContext _context = context;

  public async Task<Results<Created<PurchaseBasicDto>, BadRequest<string>, UnauthorizedHttpResult>> CreatePurchaseAsync(PurchaseCreateDto dto, ClaimsPrincipal claims)
  {
    var userIdString = claims.FindFirstValue(ClaimTypes.NameIdentifier);

    if (!int.TryParse(userIdString, out int userId)) return TypedResults.Unauthorized();


    using var transaction = await _context.Database.BeginTransactionAsync();

    try
    {
      var operationDateUtc = dto.OperationDate.ToUniversalTime();
      var dateStr = operationDateUtc.ToString("yyyyMMdd");
      var totalAmount = dto.PurchaseItems.Sum(p => p.Quantity * p.UnitCost);

      var purchase = new Purchase
      {
        ReferenceInvoice = dto.ReferenceInvoice,
        OperationDate = operationDateUtc,
        TotalAmount = totalAmount,
        Status = Status.Completed,
        SupplierId = dto.SupplierId,
        UserId = userId
      };

      _context.Purchases.Add(purchase);
      await _context.SaveChangesAsync();

      var lots = new List<Lot>();

      foreach (var pi in dto.PurchaseItems)
      {
        var lot = new Lot
        {
          ProductId = pi.ProductId,
          EntryDate = operationDateUtc,
          UnitCost = pi.UnitCost,
          InitialQuantity = pi.Quantity,
          AvailableQuantity = pi.Quantity,
          PurchaseId = purchase.Id
        };

        lots.Add(lot);
      }

      _context.Lots.AddRange(lots);
      await _context.SaveChangesAsync();

      foreach (var lot in lots)
      {
        lot.LotCode = $"{dateStr}-{lot.ProductId}-{lot.Id}";
      }

      await _context.SaveChangesAsync();
      await transaction.CommitAsync();

      var result = purchase.Adapt<PurchaseBasicDto>();

      return TypedResults.Created($"/api/purchases/{result.Id}", result);
    }
    catch (DbUpdateConcurrencyException)
    {
      return TypedResults.BadRequest("The inventory was modified during the transaction");
    }
    catch (Exception ex)
    {
      return TypedResults.BadRequest($"Error processing your purchase: {ex.Message}");
    }
  }

  public async Task<Ok<PagedList<PurchaseBasicDto>>> GetPurchasesAsync(PaginationParams queryParams)
  {
    var query = _context.Purchases
      .AsNoTracking();

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(p => p.ReferenceInvoice.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var purchases = await query
      .OrderBy(p => p.OperationDate)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<PurchaseBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<PurchaseBasicDto>(
      purchases,
      totalCount,
      queryParams.PageNumber,
      queryParams.PageSize
    );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Results<Ok<PurchaseExtendedDto>, NotFound<string>>> GetPurchaseByIdAsync(int Id)
  {
    var purchase = await _context.Purchases
      .AsNoTracking()
      .Where(p => p.Id == Id)
      .ProjectToType<PurchaseExtendedDto>()
      .FirstOrDefaultAsync();

    if (purchase is null) return TypedResults.NotFound("The purchase was not found");

    return TypedResults.Ok(purchase);
  }

  public async Task<Ok<PagedList<LotBasicDto>>> GetLotsByPurchaseAsync(int Id, PaginationParams queryParams)
  {
    var query = _context.Lots
      .AsNoTracking()
      .Where((l) => l.PurchaseId == Id);

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(p => p.LotCode.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var lots = await query
      .OrderBy(l => l.EntryDate)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<LotBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<LotBasicDto>(
     lots,
     totalCount,
     queryParams.PageNumber,
     queryParams.PageSize
   );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Results<Ok<int>, BadRequest<string>>> CancelPurchaseAsync(int Id)
  {

    var purchase = await _context.Purchases
      .Where(p => p.Id == Id)
      .FirstOrDefaultAsync();

    if (purchase is null) return TypedResults.BadRequest("The purchase was not found");

    var lots = await _context.Lots
      .Where(l => l.PurchaseId == Id)
      .ToListAsync();

    if (lots.Any(l => l.AvailableQuantity < l.InitialQuantity))
    {
      return TypedResults.BadRequest("The purchase cannot be canceled because products from these batches have already been sold");
    }

    foreach (var lot in lots)
    {
      lot.AvailableQuantity = 0;
    }

    purchase.Status = Status.Cancelled;

    await _context.SaveChangesAsync();

    return TypedResults.Ok(Id);
  }
}