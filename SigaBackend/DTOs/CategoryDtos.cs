using System.ComponentModel.DataAnnotations;

namespace SigaBackend.DTOs;

public abstract record CategoryBaseDto
{
  [MaxLength(50), MinLength(1)]
  public required string Name { get; init; }

  [MaxLength(200)]
  public string? Description { get; init; }
}

public record CategoryCreateDto : CategoryBaseDto;

public record CategoryBasicDto : CategoryBaseDto
{
  public required int Id { get; init; }
}