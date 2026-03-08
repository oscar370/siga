using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SigaBackend.Models;

namespace SigaBackend.Configurations;

public class SaleConfiguration : IEntityTypeConfiguration<Sale>
{
  public void Configure(EntityTypeBuilder<Sale> builder)
  {
    builder.HasOne(s => s.User)
      .WithMany(u => u.Sales)
      .HasForeignKey(s => s.UserId)
      .OnDelete(DeleteBehavior.Restrict);
  }
}