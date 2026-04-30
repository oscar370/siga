using System.ComponentModel.DataAnnotations;
using SigaBackend.Enums;

namespace SigaBackend.DTOs;

public record FinancialSummaryDto
{
  [Range(0.01, (double)decimal.MaxValue)]
  public required decimal TotalRevenue { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  public required decimal TotalCostOfGoodsSold { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  public required decimal GrossProfit { get; set; }
}

public record FinancialSummaryParamsDto
{
  public required DateTimeOffset StartDate { get; set; }

  public required DateTimeOffset EndDate { get; set; }
}

public record RecentTransactionDto
{
  public required int TransactionId { get; set; }

  public required TransactionType Type { get; set; }

  public required string Reference { get; set; }

  public required DateTimeOffset OperationDate { get; set; }

  public required decimal TotalAmount { get; set; }
}