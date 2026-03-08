using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SigaBackend.Models;

public enum Status
{
  Completed,
  Cancelled
}

public class Purchase()
{
  public int PurchaseId { get; set; }

  public DateTime OperationDate { get; set; }

  [MaxLength(50)]
  public string ReferenceInvoice { get; set; } = string.Empty;

  [Column(TypeName = "decimal(18,2)")]
  public decimal TotalAmount { get; set; }

  public Status Status { get; set; }

  // [1:N]
  public int SupplierId { get; set; }
  public required Supplier Supplier { get; set; }

  // [1:N]
  public int UserId { get; set; }
  public required User User { get; set; }

  // [1:N]
  public ICollection<Lot> Lots { get; set; } = [];
}