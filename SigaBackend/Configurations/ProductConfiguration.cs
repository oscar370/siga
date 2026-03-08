using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SigaBackend.Models;

namespace SigaBackend.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
  public void Configure(EntityTypeBuilder<Product> builder)
  {
    builder.HasOne(p => p.Category)
      .WithMany(c => c.Products)
      .HasForeignKey(p => p.CategoryId)
      .OnDelete(DeleteBehavior.Restrict);

    builder.HasOne(p => p.UnityOfMeasure)
      .WithMany(um => um.Products)
      .HasForeignKey(p => p.UnityOfMeasureId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}