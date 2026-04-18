using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SigaBackend.Models;

public class SaleTransaction()
{
  public int Id { get; set; }

  [Range(0.0001, (double)decimal.MaxValue)]
  [Column(TypeName = "decimal(18,4)")]
  public required decimal QuantitySold { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  [Column(TypeName = "decimal(18,2)")]
  public required decimal UnitCostApplied { get; set; }

  // [1:N]
  public required int SaleDetailsId { get; set; }
  public SaleDetails SaleDetails { get; set; } = null!;

  // [1:N]
  public required int LotId { get; set; }
  public Lot Lot { get; set; } = null!;
}