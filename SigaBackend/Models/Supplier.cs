using System.ComponentModel.DataAnnotations;

namespace SigaBackend.Models;

public class Supplier
{
  public int SupplierId { get; set; }

  [MaxLength(100)]
  [MinLength(1)]
  public required string Name { get; set; }

  [MaxLength(20)]
  [MinLength(1)]
  public required string TaxId { get; set; }

  public string ContactInfo { get; set; } = string.Empty;

  public bool IsActive { get; set; } = true;

  public DateTimeOffset? DeletedAt { get; set; }

  // [1:N]
  public ICollection<Purchase> Purchases { get; set; } = [];
}