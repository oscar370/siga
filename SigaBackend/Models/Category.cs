using System.ComponentModel.DataAnnotations;

namespace SigaBackend.Models;

public class Category
{
  public int Id { get; set; }

  [MaxLength(50), MinLength(1)]
  public required string Name { get; set; }

  [MaxLength(200)]
  public string? Description { get; set; } = string.Empty;

  public bool IsActive { get; set; } = true;

  public DateTimeOffset? DeletedAt { get; set; }

  // [1:N]
  public ICollection<Product> Products { get; set; } = [];
}