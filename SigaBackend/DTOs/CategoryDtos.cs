using System.ComponentModel.DataAnnotations;

namespace SigaBackend.DTOs;

public record CategoryCreateDto
{
  private string _name = string.Empty;

  [MaxLength(50)]
  [MinLength(1)]
  public required string Name { get => _name; set => _name = value.Trim(); }
  [MaxLength(200)]
  public string Description { get; set; } = string.Empty;
}

public record CategoryBasicDto(int Id, string Name, string? Description)
{
  public int Id { get; set; } = Id;
  public string Name { get; set; } = Name;
  public string Description { get; set; } = Description ?? string.Empty;
}
