using System.ComponentModel.DataAnnotations.Schema;

namespace SigaBackend.Models;

public class SaleDetails()
{
  public int SaleDetailsId { get; set; }

  [Column(TypeName = "decimal(18,4)")]
  public decimal QuantityRequested { get; set; }

  [Column(TypeName = "decimal(18,2)")]
  public decimal UnitSellingPrice { get; set; }

  // [1:N]
  public int SaleId { get; set; }
  public required Sale Sale { get; set; }

  // [1:N]
  public int ProductId { get; set; }
  public required Product Product { get; set; }

  // [1:N]
  public ICollection<SaleTransaction> Transactions { get; set; } = [];
}

