using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SigaBackend.Models;

namespace SigaBackend.Configurations;

public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
{
  public void Configure(EntityTypeBuilder<UserRole> builder)
  {
    builder.HasKey(ur => new { ur.UserId, ur.RoleId });

    builder.HasOne(ur => ur.User)
      .WithMany(u => u.UserRoles)
      .HasForeignKey(ur => ur.UserId)
      .OnDelete(DeleteBehavior.Cascade);

    builder.HasOne(ur => ur.Role)
      .WithMany(r => r.UserRoles)
      .HasForeignKey(ur => ur.RoleId)
      .OnDelete(DeleteBehavior.Cascade);
  }
}

public class UserConfiguration : IEntityTypeConfiguration<User>
{
  public void Configure(EntityTypeBuilder<User> builder)
  {
    builder.HasIndex("Email")
      .IsUnique();
  }
}

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
  public void Configure(EntityTypeBuilder<Role> builder)
  {
    builder.HasIndex("Name")
      .IsUnique();
  }
}