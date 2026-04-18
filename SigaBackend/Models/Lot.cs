using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SigaBackend.Models;

public class Lot()
{

  public int Id { get; set; }

  [MaxLength(100), MinLength(1)]
  public string LotCode { get; set; } = string.Empty;

  public required DateTimeOffset EntryDate { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  [Column(TypeName = "decimal(18,2)")]
  public required decimal UnitCost { get; set; }

  [Range(0.0001, (double)decimal.MaxValue)]
  [Column(TypeName = "decimal(18,4)")]
  public required decimal InitialQuantity { get; set; }

  [Range(0.0001, (double)decimal.MaxValue)]
  [Column(TypeName = "decimal(18,4)")]
  public required decimal AvailableQuantity { get; set; }

  // Race condition
  public byte[] RowVersion { get; set; } = [];

  // [1:N]
  public required int ProductId { get; set; }
  public Product Product { get; set; } = null!;

  // [1:N]
  public required int PurchaseId { get; set; }
  public Purchase Purchase { get; set; } = null!;

  // [1:N]
  public ICollection<SaleTransaction> Transactions { get; set; } = [];
}