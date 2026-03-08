using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SigaBackend.Models;

namespace SigaBackend.Configurations;

public class PurchaseConfiguration : IEntityTypeConfiguration<Purchase>
{
  public void Configure(EntityTypeBuilder<Purchase> builder)
  {
    builder.HasOne(p => p.Supplier)
      .WithMany(s => s.Purchases)
      .HasForeignKey(p => p.SupplierId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(p => p.User)
      .WithMany(u => u.Purchases)
      .HasForeignKey(p => p.UserId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}