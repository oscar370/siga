using Microsoft.AspNetCore.Identity;
using SigaBackend.Models;

namespace SigaBackend.Data;

public static class DbSeeder
{
  public static async Task SeedRolesAndAdminAsync(IServiceProvider serviceProvider)
  {
    var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();

    string adminRoleName = "Admin";
    string adminEmail = "admin@correo.com";

    if (!await roleManager.RoleExistsAsync(adminRoleName))
    {
      await roleManager.CreateAsync(new IdentityRole<int>(adminRoleName));
    }

    var adminUser = await userManager.FindByEmailAsync(adminEmail);
    if (adminUser == null)
    {
      adminUser = new User
      {
        UserName = adminEmail,
        Email = adminEmail,
        FullName = "Administrador del Sistema",
        IsActive = true,
        EmailConfirmed = true
      };

      var createPowerUser = await userManager.CreateAsync(adminUser, "Admin123*!");

      if (createPowerUser.Succeeded)
      {
        await userManager.AddToRoleAsync(adminUser, adminRoleName);
      }
    }
  }
}