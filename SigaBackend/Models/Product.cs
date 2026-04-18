using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SigaBackend.Models;

public class Product()
{
  public int Id { get; set; }

  [MaxLength(50), MinLength(1)]
  public required string Name { get; set; }

  [MaxLength(50), MinLength(1)]
  public required string SKU { get; set; }

  [MaxLength(200)]
  public string? Description { get; set; } = null;

  [Range(0.01, (double)decimal.MaxValue)]
  [Column(TypeName = "decimal(18,2)")]
  public required decimal BasePrice { get; set; }

  public bool IsActive { get; set; } = true;
  public DateTimeOffset? DeletedAt { get; set; }

  // [1:N]
  public required int CategoryId { get; set; }
  public Category Category { get; set; } = null!;

  // [1:N]
  public required int UnityOfMeasureId { get; set; }
  public UnityOfMeasure UnityOfMeasure { get; set; } = null!;

  // [1:N]
  public ICollection<Lot> Lots { get; set; } = [];

  // [1:N]
  public ICollection<SaleDetails> Details { get; set; } = [];
}