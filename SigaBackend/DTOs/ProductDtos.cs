using System.ComponentModel.DataAnnotations;

namespace SigaBackend.DTOs;

public abstract record ProductBaseDto
{
  [MaxLength(50), MinLength(1)]
  public required string Name { get; set; }

  [MaxLength(50), MinLength(1)]
  public required string SKU { get; set; }

  [MaxLength(200)]
  public string? Description { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  public required decimal BasePrice { get; set; }
  public required int CategoryId { get; set; }
  public required int UnityOfMeasureId { get; set; }
}

public record ProductCreateDto : ProductBaseDto;

public record ProductBasicDto : ProductBaseDto
{
  public int Id { get; set; }
}

public record ProductExtendedDto : ProductBaseDto
{
  public int Id { get; set; }

  public required CategoryBasicDto Category { get; set; }

  public required UnityOfMeasureBasicDto UnityOfMeasure { get; set; }
}