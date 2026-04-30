using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SigaBackend.Enums;

namespace SigaBackend.Models;

public class Sale()
{
  public int Id { get; set; }

  [MaxLength(50), MinLength(1)]
  public required string ReferenceInvoice { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  [Column(TypeName = "decimal(18,2)")]
  public required decimal TotalRevenue { get; set; }

  public required DateTime OperationDate { get; set; }

  public required Status Status { get; set; }

  // [1:N]
  public ICollection<SaleDetails> Details { get; set; } = [];

  // [1:N]
  public required int UserId { get; set; }
  public User User { get; set; } = null!;
}