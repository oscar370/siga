using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;

namespace SigaBackend.Services;

interface ILotService
{
  Task<Results<Ok<List<LotBasicDto>>, NotFound>> GetLotsAsync();
  Task<Results<Ok<LotExpandedDto>, NotFound>> GetLotByIdAsync(int Id);
}

public class LotService(SigaDbContext context) : ILotService
{
  private readonly SigaDbContext _context = context;

  public async Task<Results<Ok<List<LotBasicDto>>, NotFound>> GetLotsAsync()
  {
    var lots = await _context.Lots.Select(l => new LotBasicDto(
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
    .ToListAsync();

    return TypedResults.Ok(lots);
  }

  public async Task<Results<Ok<LotExpandedDto>, NotFound>> GetLotByIdAsync(int Id)
  {
    var lot = await _context.Lots
      .Where(l => l.LotId == Id)
      .Select(l => new LotExpandedDto(
        l.LotId,
        l.LotCode,
        l.EntryDate,
        l.UnitCost,
        l.AvailableQuantity,
        l.ProductId,
        l.ProductId,
        new ProductBasicDto(
          l.Product.ProductId,
          l.Product.Name,
          l.Product.SKU,
          l.Product.Description,
          l.Product.BasePrice,
          l.Product.CategoryId,
          l.Product.UnityOfMeasureId
        ),
        new PurchaseBasicDto(
          l.Purchase.PurchaseId,
          l.Purchase.ReferenceInvoice,
          l.Purchase.OperationDate,
          l.Purchase.TotalAmount,
          l.Purchase.Status,
          l.Purchase.SupplierId,
          l.Purchase.UserId
        ),
        l.Transactions.Select(t => new SaleTransactionDto(
          t.QuantitySold,
          t.UnitCostApplied,
          t.SaleDetailsId,
          t.LotId
        ))
      ))
      .FirstAsync();

    return TypedResults.Ok(lot);
  }
}