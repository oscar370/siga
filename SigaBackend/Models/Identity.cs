using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SigaBackend.Models;

public class User : IdentityUser<int>
{
  [MaxLength(100)]
  public string FullName { get; set; } = null!;
  public bool IsActive { get; set; } = true;
  public ICollection<Purchase> Purchases { get; set; } = [];
  public ICollection<Sale> Sales { get; set; } = [];
}