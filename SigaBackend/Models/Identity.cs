using System.ComponentModel.DataAnnotations;

namespace SigaBackend.Models;

public class User
{
  public int UserId { get; set; }

  [MaxLength(100)]
  public required string FullName { get; set; }

  [MaxLength(256)]
  public required string Email { get; set; }

  public required string PasswordHash { get; set; }

  public bool IsActive { get; set; } = true;

  // [1:N]
  public ICollection<UserRole> UserRoles { get; set; } = [];

  // [1:N]
  public ICollection<Purchase> Purchases { get; set; } = [];

  // [1:N]
  public ICollection<Sale> Sales { get; set; } = [];
}

public class Role
{
  public int RoleId { get; set; }

  [MaxLength(50)]
  public required string Name { get; set; }

  // [1:N]
  public ICollection<UserRole> UserRoles { get; set; } = [];
}

public class UserRole
{
  // [1:N]
  public int UserId { get; set; }
  public required User User { get; set; }

  // [1:N]
  public int RoleId { get; set; }
  public required Role Role { get; set; }
}

// Dtos

public record UserResponseDto
{
  public string FullName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public List<string> Roles { get; set; } = [];
}