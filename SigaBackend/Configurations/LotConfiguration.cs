using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SigaBackend.Models;

namespace SigaBackend.Configurations;

public class LotConfiguration : IEntityTypeConfiguration<Lot>
{
  public void Configure(EntityTypeBuilder<Lot> builder)
  {
    builder.HasIndex(l => new
    {
      l.ProductId,
      l.AvailableQuantity,
      l.EntryDate
    });

    builder.Property(l => l.RowVersion).IsRowVersion();

    builder.HasOne(l => l.Product)
      .WithMany(p => p.Lots)
      .HasForeignKey(l => l.ProductId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(l => l.Purchase)
      .WithMany(p => p.Lots)
      .HasForeignKey(l => l.PurchaseId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}