using System.ComponentModel.DataAnnotations;

namespace SigaBackend.Models;

public class UnityOfMeasure
{
  public int UnityOfMeasureId { get; set; }

  [MaxLength(50)]
  [MinLength(1)]
  public required string Name { get; set; }

  [MaxLength(10)]
  [MinLength(1)]
  public required string Abbreviation { get; set; }

  // [1:N]
  public ICollection<Product> Products { get; set; } = [];
}