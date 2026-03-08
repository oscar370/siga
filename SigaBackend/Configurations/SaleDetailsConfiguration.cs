using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SigaBackend.Models;

namespace SigaBackend.Configurations;

public class SaleDetailsConfiguration : IEntityTypeConfiguration<SaleDetails>
{
  public void Configure(EntityTypeBuilder<SaleDetails> builder)
  {
    builder.HasOne(sd => sd.Sale)
      .WithMany(s => s.Details)
      .HasForeignKey(sd => sd.SaleId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(sd => sd.Product)
      .WithMany(p => p.Details)
      .HasForeignKey(sd => sd.ProductId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}