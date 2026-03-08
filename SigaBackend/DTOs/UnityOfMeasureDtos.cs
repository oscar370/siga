using System.ComponentModel.DataAnnotations;

namespace SigaBackend.DTOs;

public record UnityOfMeasureCreateDto
{
  private string _name = string.Empty;
  private string _abbreviation = string.Empty;

  [MaxLength(50)]
  [MinLength(1)]
  public string Name { get => _name; set => _name = value.Trim(); }

  [MaxLength(10)]
  [MinLength(1)]
  public string Abbreviation { get => _abbreviation; set => _abbreviation = value.Trim(); }
}

public record UnityOfMeasureBasicDto(int Id, string Name, string Abbreviation);