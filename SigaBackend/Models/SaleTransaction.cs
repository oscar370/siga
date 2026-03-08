using System.ComponentModel.DataAnnotations.Schema;

namespace SigaBackend.Models;

public class SaleTransaction()
{
  public int SaleTransactionId { get; set; }

  [Column(TypeName = "decimal(18,4)")]
  public decimal QuantitySold { get; set; }

  [Column(TypeName = "decimal(18,2)")]
  public decimal UnitCostApplied { get; set; }

  // [1:N]
  public int SaleDetailsId { get; set; }
  public required SaleDetails SaleDetails { get; set; }

  // [1:N]
  public int LotId { get; set; }
  public required Lot Lot { get; set; }
}