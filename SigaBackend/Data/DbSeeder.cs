using Microsoft.AspNetCore.Identity;
using SigaBackend.Models;

namespace SigaBackend.Data;

// dotnet user-secrets set "SeedPasswords:Admin" ""
// dotnet user-secrets set "SeedPasswords:Auditor" ""
public static class DbSeeder
{
  public static async Task SeedRolesAndAdminAsync(IServiceProvider serviceProvider)
  {
    var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<int>>>();
    var config = serviceProvider.GetRequiredService<IConfiguration>();

    string adminPassword = config["SeedPasswords:Admin"]
        ?? throw new InvalidOperationException("The secret is missing 'SeedPasswords:Admin'.");

    string auditorPassword = config["SeedPasswords:Auditor"]
        ?? throw new InvalidOperationException("The secret is missing 'SeedPasswords:Auditor'.");

    string adminRoleName = "Admin";
    string auditorRoleName = "Auditor";
    string adminEmail = "admin@correo.com";
    string auditorEmail = "auditor@correo.com";

    if (!await roleManager.RoleExistsAsync(adminRoleName))
      await roleManager.CreateAsync(new IdentityRole<int>(adminRoleName));

    if (!await roleManager.RoleExistsAsync(auditorRoleName))
      await roleManager.CreateAsync(new IdentityRole<int>(auditorRoleName));

    var adminUser = await userManager.FindByEmailAsync(adminEmail);
    if (adminUser == null)
    {
      adminUser = new User { UserName = adminEmail, Email = adminEmail, FullName = "Administrador del Sistema", IsActive = true, EmailConfirmed = true };
      var createPowerUser = await userManager.CreateAsync(adminUser, adminPassword);
      if (createPowerUser.Succeeded) await userManager.AddToRoleAsync(adminUser, adminRoleName);
    }

    var auditorUser = await userManager.FindByEmailAsync(auditorEmail);
    if (auditorUser == null)
    {
      auditorUser = new User { UserName = auditorEmail, Email = auditorEmail, FullName = "Auditor de Demo", IsActive = true, EmailConfirmed = true };
      var createAuditorUser = await userManager.CreateAsync(auditorUser, auditorPassword);
      if (createAuditorUser.Succeeded) await userManager.AddToRoleAsync(auditorUser, auditorRoleName);
    }
  }
}