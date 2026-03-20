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

  public required DateTimeOffset OperationDate { get; set; }

  [MaxLength(50)]
  [MinLength(1)]
  public required string ReferenceInvoice { get; set; }

  [Range(0.01, (double)decimal.MaxValue, ErrorMessage = "The amount must be greater than 0")]
  [Column(TypeName = "decimal(18,2)")]
  public required decimal TotalAmount { get; set; }

  public required Status Status { get; set; }

  // [1:N]
  public required int SupplierId { get; set; }
  public Supplier Supplier { get; set; } = null!;

  // [1:N]
  public required int UserId { get; set; }
  public User User { get; set; } = null!;

  // [1:N]
  public ICollection<Lot> Lots { get; set; } = [];
}