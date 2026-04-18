using System.ComponentModel.DataAnnotations;

namespace SigaBackend.DTOs;

public abstract record UnityOfMeasureBaseDto
{
  [MaxLength(50), MinLength(1)]
  public required string Name { get; set; }

  [MaxLength(10), MinLength(1)]
  public required string Abbreviation { get; set; }
}

public record UnityOfMeasureCreateDto : UnityOfMeasureBaseDto;

public record UnityOfMeasureBasicDto : UnityOfMeasureBaseDto
{
  public required int Id { get; set; }
}

public record UnityOfMeasureExtendedDto : UnityOfMeasureBaseDto
{
  public required int Id { get; set; }

  public required ICollection<ProductBasicDto> Products { get; set; }
}