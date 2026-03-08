using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SigaBackend.Models;

public class Lot()
{
  public int LotId { get; set; }

  public DateTime EntryDate { get; set; }

  [Column(TypeName = "decimal(18,2)")]
  public decimal UnitCost { get; set; }

  [Column(TypeName = "decimal(18,4)")]
  public decimal InitialQuantity { get; set; }

  [Column(TypeName = "decimal(18,4)")]
  public decimal AvailableQuantity { get; set; }

  // Race condition
  public byte[] RowVersion { get; set; } = [];

  // [1:N]
  public int ProductId { get; set; }
  public required Product Product { get; set; }

  // [1:N]
  public int PurchaseId { get; set; }
  public required Purchase Purchase { get; set; }

  // [1:N]
  public ICollection<SaleTransaction> Transactions { get; set; } = [];
}