using System.ComponentModel.DataAnnotations.Schema;

namespace SigaBackend.Models;

public class Sale()
{
  public int SaleId { get; set; }

  public DateTime OperationDate { get; set; }

  [Column(TypeName = "decimal(18,2)")]
  public decimal TotalAmount { get; set; }

  public Status Status { get; set; }

  // [1:N]
  public ICollection<SaleDetails> Details { get; set; } = [];

  // [1:N]
  public int UserId { get; set; }
  public User User { get; set; } = null!;
}