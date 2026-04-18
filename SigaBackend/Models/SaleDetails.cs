using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SigaBackend.Models;

public class SaleDetails()
{
  public int Id { get; set; }

  [Range(0.0001, (double)decimal.MaxValue)]
  [Column(TypeName = "decimal(18,4)")]
  public required decimal QuantityRequested { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  [Column(TypeName = "decimal(18,2)")]
  public required decimal UnitSellingPrice { get; set; }

  // [1:N]
  public required int SaleId { get; set; }
  public Sale Sale { get; set; } = null!;

  // [1:N]
  public required int ProductId { get; set; }
  public Product Product { get; set; } = null!;

  // [1:N]
  public ICollection<SaleTransaction> Transactions { get; set; } = [];
}

