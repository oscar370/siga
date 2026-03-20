using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Models;

namespace SigaBackend.Data;

// dotnet ef migrations add InitialCreate
// dotnet ef database update
public class SigaDbContext(DbContextOptions<SigaDbContext> options) : IdentityDbContext<User, IdentityRole<int>, int>(options)
{
  public DbSet<Category> Categories { get; set; }
  public DbSet<Supplier> Suppliers { get; set; }
  public DbSet<UnityOfMeasure> UnityOfMeasures { get; set; }
  public DbSet<Lot> Lots { get; set; }
  public DbSet<Product> Products { get; set; }
  public DbSet<Purchase> Purchases { get; set; }
  public DbSet<Sale> Sales { get; set; }
  public DbSet<SaleDetails> SaleDetails { get; set; }
  public DbSet<SaleTransaction> SaleTransactions { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);
    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
  }
}