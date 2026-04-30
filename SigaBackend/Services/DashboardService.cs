using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Enums;

namespace SigaBackend.Services;

public interface IDashboardService
{
  Task<Ok<FinancialSummaryDto>> GetFinancialSummaryAsync(FinancialSummaryParamsDto financialParams);

  Task<Ok<IEnumerable<RecentTransactionDto>>> GetRecentTransactionsAsync(int limit = 10);
}

public class DashboardService(SigaDbContext context) : IDashboardService
{
  private readonly SigaDbContext _context = context;

  public async Task<Ok<FinancialSummaryDto>> GetFinancialSummaryAsync(FinancialSummaryParamsDto financialParams)
  {
    var totalRevenue = await _context.Sales
      .AsNoTracking()
      .Where(s => s.OperationDate >= financialParams.StartDate && s.OperationDate <= financialParams.EndDate && s.Status == Status.Completed)
      .SumAsync(s => s.TotalRevenue);

    var totalCost = await _context.Sales
      .AsNoTracking()
      .Where(s => s.OperationDate >= financialParams.StartDate && s.OperationDate <= financialParams.EndDate && s.Status == Status.Completed)
      .SelectMany(s => s.Details)
      .SelectMany(d => d.Transactions)
      .SumAsync(t => t.QuantitySold * t.UnitCostApplied);

    var result = new FinancialSummaryDto
    {
      TotalRevenue = totalRevenue,
      TotalCostOfGoodsSold = totalCost,
      GrossProfit = totalRevenue - totalCost
    };

    return TypedResults.Ok(result);

  }

  public async Task<Ok<IEnumerable<RecentTransactionDto>>> GetRecentTransactionsAsync(int limit = 10)
  {
    var recentSales = await _context.Sales
      .AsNoTracking()
      .OrderByDescending(s => s.OperationDate)
      .Take(limit)
      .Select(s => new RecentTransactionDto
      {
        TransactionId = s.Id,
        Type = TransactionType.Sale,
        Reference = s.ReferenceInvoice,
        OperationDate = s.OperationDate,
        TotalAmount = s.TotalRevenue
      }
      )
      .ToListAsync();

    var recentPurchases = await _context.Purchases
      .AsNoTracking()
      .OrderByDescending(p => p.OperationDate)
      .Take(limit)
      .Select(p => new RecentTransactionDto
      {
        TransactionId = p.Id,
        Type = TransactionType.Purchase,
        Reference = p.ReferenceInvoice,
        OperationDate = p.OperationDate,
        TotalAmount = p.TotalCost
      }
      )
      .ToListAsync();

    var result = recentSales
      .Concat(recentPurchases)
      .OrderByDescending(t => t.OperationDate)
      .Take(limit);

    return TypedResults.Ok(result);
  }

}