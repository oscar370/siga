using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SigaBackend.Models;

namespace SigaBackend.Configurations;

public class SaleTransactionConfiguration : IEntityTypeConfiguration<SaleTransaction>
{
  public void Configure(EntityTypeBuilder<SaleTransaction> builder)
  {
    builder.HasOne(st => st.SaleDetails)
      .WithMany(sd => sd.Transactions)
      .HasForeignKey(st => st.SaleDetailsId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(st => st.Lot)
      .WithMany(l => l.Transactions)
      .HasForeignKey(st => st.LotId)
      .HasPrincipalKey(l => l.Id);
  }
}