using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Models;

namespace SigaBackend.Services;

interface IPurchaseService
{
  Task<Results<Created<PurchaseBasicDto>, BadRequest<string>, UnauthorizedHttpResult>> CreatePurchaseAsync(PurchaseCreateDto dto, ClaimsPrincipal claims);
  Task<Results<Ok<List<PurchaseBasicDto>>, NotFound>> GetPurchasesAsync();
  Task<Results<Ok<PurchaseExtendedDto>, NotFound>> GetPurchaseByIdAsync(int Id);
  Task<Results<Ok<int>, BadRequest<string>>> CancelPurchaseAsync(int Id);
}

public class PurchaseService(SigaDbContext context) : IPurchaseService
{
  private readonly SigaDbContext _context = context;

  public async Task<Results<Created<PurchaseBasicDto>, BadRequest<string>, UnauthorizedHttpResult>> CreatePurchaseAsync(PurchaseCreateDto dto, ClaimsPrincipal claims)
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
          PurchaseId = purchase.PurchaseId
        };

        lots.Add(lot);
      }

      _context.Lots.AddRange(lots);
      await _context.SaveChangesAsync();

      foreach (var lot in lots)
      {
        lot.LotCode = $"{dateStr}-{lot.ProductId}-{lot.LotId}";
      }

      await _context.SaveChangesAsync();
      await transaction.CommitAsync();

      var result = new PurchaseBasicDto(
        purchase.PurchaseId,
        purchase.ReferenceInvoice,
        purchase.OperationDate,
        purchase.TotalAmount,
        purchase.Status,
        purchase.SupplierId,
        purchase.UserId
      );

      return TypedResults.Created($"/api/purchases/{purchase.PurchaseId}", result);
    }
    catch (Exception ex)
    {
      return TypedResults.BadRequest($"Error processing your purchase: {ex.Message}");
    }
  }

  public async Task<Results<Ok<List<PurchaseBasicDto>>, NotFound>> GetPurchasesAsync()
  {
    var purchases = await _context.Purchases
      .Select(p => new PurchaseBasicDto(
        p.PurchaseId,
        p.ReferenceInvoice,
        p.OperationDate,
        p.TotalAmount,
        p.Status,
        p.SupplierId,
        p.UserId
      ))
      .ToListAsync();

    return TypedResults.Ok(purchases);
  }

  public async Task<Results<Ok<PurchaseExtendedDto>, NotFound>> GetPurchaseByIdAsync(int Id)
  {
    var purchase = await _context.Purchases
      .Where(p => p.PurchaseId == Id)
      .Select(p => new PurchaseExtendedDto(
        p.PurchaseId,
        p.ReferenceInvoice,
        p.OperationDate,
        p.TotalAmount,
        p.Status,
        p.SupplierId,
        p.UserId,
        new SupplierBasicDto(
          p.Supplier.SupplierId,
          p.Supplier.Name,
          p.Supplier.TaxId,
          p.Supplier.ContactInfo
        ),
        new UserBasicDto(
          p.User.Id,
          p.User.Email,
          p.User.FullName
        ),
        p.Lots.Select(l => new LotBasicDto(
          l.LotId,
          l.LotCode,
          l.EntryDate,
          l.UnitCost,
          l.AvailableQuantity,
          l.ProductId,
          l.PurchaseId,
          new ProductBasicDto(
            l.Product.ProductId,
            l.Product.Name,
            l.Product.SKU,
            l.Product.Description,
            l.Product.BasePrice,
            l.Product.CategoryId,
            l.Product.UnityOfMeasureId
          )
        ))
        .ToList()
      ))
      .FirstAsync();

    return TypedResults.Ok(purchase);
  }

  public async Task<Results<Ok<int>, BadRequest<string>>> CancelPurchaseAsync(int Id)
  {

    var purchase = await _context.Purchases.Where(p => p.PurchaseId == Id).FirstAsync();
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