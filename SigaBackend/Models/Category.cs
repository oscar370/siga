using System.ComponentModel.DataAnnotations;

namespace SigaBackend.Models;

public class Category
{
  public int CategoryId { get; set; }

  [MaxLength(50)]
  public required string Name { get; set; }

  [MaxLength(200)]
  public string Description { get; set; } = string.Empty;

  public bool IsActive { get; set; } = true;

  public DateTime? DeletedAt { get; set; }

  // [1:N]
  public ICollection<Product> Products { get; set; } = [];
}