using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Models;

namespace SigaBackend.Data;

// dotnet user-secrets set "SeedPasswords:Admin" ""
// dotnet user-secrets set "SeedPasswords:Auditor" ""
public static class DbSeeder
{
  public static async Task SeedInventoryAsync(SigaDbContext context)
  {

    await SeedUnityOfMeasuresAsync(context);
    await SeedCategoriesAsync(context);
    await SeedSuppliersAsync(context);

    await SeedProductsAsync(context);
    await SeedPurchasesAsync(context);

    await SeedLotsAsync(context);
    await SeedSalesAsync(context);
  }

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

  private static async Task SeedCategoriesAsync(SigaDbContext context)
  {
    if (await context.Categories.AnyAsync()) return;

    context.Categories.AddRange(
      new Category { Name = "Frutas y Verduras", Description = "", IsActive = true, DeletedAt = null },
      new Category { Name = "Lácteos", Description = "", IsActive = true, DeletedAt = null },
      new Category { Name = "Quesos", Description = "", IsActive = true, DeletedAt = null }
    );

    await context.SaveChangesAsync();
  }

  private static async Task SeedUnityOfMeasuresAsync(SigaDbContext context)
  {
    if (await context.UnityOfMeasures.AnyAsync()) return;

    context.UnityOfMeasures.AddRange(
        new UnityOfMeasure { Name = "Litro", Abbreviation = "L" },
        new UnityOfMeasure { Name = "Kilogramo", Abbreviation = "Kg" },
        new UnityOfMeasure { Name = "Gramo", Abbreviation = "g" },
        new UnityOfMeasure { Name = "Pieza", Abbreviation = "Pz" }
    );

    await context.SaveChangesAsync();
  }



  private static async Task SeedProductsAsync(SigaDbContext context)
  {
    if (await context.Products.AnyAsync()) return;

    context.Products.AddRange(
        // (Id: 1)
        new Product { Name = "Manzana Kg", SKU = "MANZANA-1000", BasePrice = 30.00m, IsActive = true, CategoryId = 1, UnityOfMeasureId = 2 },
        new Product { Name = "Piña Pz", SKU = "PIÑA-1", BasePrice = 60.00m, IsActive = true, CategoryId = 1, UnityOfMeasureId = 4 },
        new Product { Name = "Plátano Kg", SKU = "PLATANO-1000", BasePrice = 21.00m, IsActive = true, CategoryId = 1, UnityOfMeasureId = 2 },
        new Product { Name = "Aguacate Kg", SKU = "AGUACATE-1000", BasePrice = 54.00m, IsActive = true, CategoryId = 1, UnityOfMeasureId = 2 },
        new Product { Name = "Cebolla Blanca Kg", SKU = "CEBOLLA-BLANCA-1000", BasePrice = 16.00m, IsActive = true, CategoryId = 1, UnityOfMeasureId = 2 },
        new Product { Name = "Jitomate Kg", SKU = "JITOMATE-1000", BasePrice = 46.00m, IsActive = true, CategoryId = 1, UnityOfMeasureId = 2 },
        new Product { Name = "Papas Kg", SKU = "PAPAS-1000", BasePrice = 29.00m, IsActive = true, CategoryId = 1, UnityOfMeasureId = 2 },

        // (Id: 2)
        new Product { Name = "Leche Entera Santa Clara 1.5 L", SKU = "SANTA-CLARA-LECHE-ENTERA-1500", BasePrice = 50.00m, IsActive = true, CategoryId = 2, UnityOfMeasureId = 4 },
        new Product { Name = "Leche Deslactosada Santa Clara 1.5 L", SKU = "SANTA-CLARA-LECHE-DESLACTOSADA-1500", BasePrice = 55.00m, IsActive = true, CategoryId = 2, UnityOfMeasureId = 4 },

        // (Id: 3)
        new Product { Name = "Queso Panela Fud 200g", SKU = "FUD-QUESO-PANELA-200", BasePrice = 39.00m, IsActive = true, CategoryId = 3, UnityOfMeasureId = 4 },
        new Product { Name = "Queso Amarillo Burr 144 g", SKU = "BURR-QUESO-AMARILLO-144", BasePrice = 20.00m, IsActive = true, CategoryId = 3, UnityOfMeasureId = 4 },
        new Product { Name = "Queso Oaxaca Lala 400 g", SKU = "LALA-QUESO-OAXACA-400", BasePrice = 88.00m, IsActive = true, CategoryId = 3, UnityOfMeasureId = 4 }
    );

    await context.SaveChangesAsync();
  }

  private static async Task SeedSuppliersAsync(SigaDbContext context)
  {
    if (await context.Suppliers.AnyAsync()) return;

    context.Suppliers.AddRange(
        new Supplier { Name = "Frutícola Cuauhtémoc S.A.", TaxId = "FRS260505LJ9", ContactInfo = "frs@correo.com", IsActive = true },
        new Supplier { Name = "Agrícola de la Cuenca del Papaloapan", TaxId = "AGP2605056A8", ContactInfo = "agp@correo.com", IsActive = true },
        new Supplier { Name = "Comercializadora de Frutos Tropicales", TaxId = "CFT260505SR4", ContactInfo = "cft@correo.com", IsActive = true },
        new Supplier { Name = "Unión de Productores de Uruapan", TaxId = "UPU260505FU0", ContactInfo = "upu@correo.com", IsActive = true },
        new Supplier { Name = "Hortalizas Selectas del Bajío", TaxId = "HSB2605058E5", ContactInfo = "hsb@correo.com", IsActive = true },
        new Supplier { Name = "Agroindustrias del Noroeste", TaxId = "AGN2605052D0", ContactInfo = "agn@correo.com", IsActive = true },
        new Supplier { Name = "Distribuidora de Tubérculos de la CEDA", TaxId = "DIT260505CRA", ContactInfo = "dit@correo.com", IsActive = true },
        new Supplier { Name = "Jugos del Valle - Santa Clara", TaxId = "JV-260505V89", ContactInfo = "jv@correo.com", IsActive = true },
        new Supplier { Name = "Sigma Alimentos S.A. de C.V.", TaxId = "SAS2605051N3", ContactInfo = "sas@correo.com", IsActive = true },
        new Supplier { Name = "Grupo Lala S.A.B. de C.V.", TaxId = "GLC260505CH0", ContactInfo = "glc@correo.com", IsActive = true }
    );

    await context.SaveChangesAsync();
  }

  private static async Task SeedPurchasesAsync(SigaDbContext context)
  {
    if (await context.Purchases.AnyAsync()) return;

    static DateTime ToUtc(string date) => DateTime.Parse(date, null, System.Globalization.DateTimeStyles.RoundtripKind).ToUniversalTime();

    context.Purchases.AddRange(
        new Purchase { ReferenceInvoice = "WX0YR-R9JXP", TotalCost = 4000.00m, OperationDate = ToUtc("2026-05-04T16:00:00Z"), Status = 0, SupplierId = 1, UserId = 1 },
        new Purchase { ReferenceInvoice = "3QMVK-B06CE", TotalCost = 6600.00m, OperationDate = ToUtc("2026-05-01T18:02:00Z"), Status = 0, SupplierId = 2, UserId = 1 },
        new Purchase { ReferenceInvoice = "HMW2V-C9DLL", TotalCost = 3026.00m, OperationDate = ToUtc("2026-05-02T17:38:00Z"), Status = 0, SupplierId = 3, UserId = 1 },
        new Purchase { ReferenceInvoice = "822M2-E4H7C", TotalCost = 4410.00m, OperationDate = ToUtc("2026-04-29T19:55:00Z"), Status = 0, SupplierId = 4, UserId = 1 },
        new Purchase { ReferenceInvoice = "TA0LG-JG3DN", TotalCost = 1450.00m, OperationDate = ToUtc("2026-05-04T20:13:00Z"), Status = 0, SupplierId = 5, UserId = 1 },
        new Purchase { ReferenceInvoice = "CS9MA-BMC0P", TotalCost = 10680.00m, OperationDate = ToUtc("2026-05-05T23:21:00Z"), Status = 0, SupplierId = 6, UserId = 1 },
        new Purchase { ReferenceInvoice = "WQLLB-GCRMT", TotalCost = 5040.00m, OperationDate = ToUtc("2026-05-04T12:38:00Z"), Status = 0, SupplierId = 7, UserId = 1 },
        new Purchase { ReferenceInvoice = "7RF48-F2FXJ", TotalCost = 63000.00m, OperationDate = ToUtc("2026-05-02T13:08:00Z"), Status = 0, SupplierId = 8, UserId = 1 },
        new Purchase { ReferenceInvoice = "QHWRU-KJZ77", TotalCost = 12000.00m, OperationDate = ToUtc("2026-05-05T16:01:00Z"), Status = 0, SupplierId = 10, UserId = 1 },
        new Purchase { ReferenceInvoice = "XXNKW-D9GVZ", TotalCost = 5160.00m, OperationDate = ToUtc("2026-05-04T17:57:00Z"), Status = 0, SupplierId = 9, UserId = 1 }
    );

    await context.SaveChangesAsync();
  }

  private static async Task SeedLotsAsync(SigaDbContext context)
  {
    if (await context.Lots.AnyAsync()) return;

    static DateTime ToUtc(string date) => DateTime.Parse(date, null, System.Globalization.DateTimeStyles.RoundtripKind).ToUniversalTime();

    context.Lots.AddRange(
        new Lot { LotCode = "20260504-1-3", EntryDate = ToUtc("2026-05-04T16:00:00Z"), UnitCost = 20.00m, InitialQuantity = 200.0000m, AvailableQuantity = 178.0000m, ProductId = 1, PurchaseId = 1 },
        new Lot { LotCode = "20260501-2-4", EntryDate = ToUtc("2026-05-01T18:02:00Z"), UnitCost = 50.00m, InitialQuantity = 132.0000m, AvailableQuantity = 122.0000m, ProductId = 2, PurchaseId = 2 },
        new Lot { LotCode = "20260502-3-5", EntryDate = ToUtc("2026-05-02T17:38:00Z"), UnitCost = 17.00m, InitialQuantity = 178.0000m, AvailableQuantity = 158.0000m, ProductId = 3, PurchaseId = 3 },
        new Lot { LotCode = "20260429-4-6", EntryDate = ToUtc("2026-04-29T19:55:00Z"), UnitCost = 45.00m, InitialQuantity = 98.0000m, AvailableQuantity = 98.0000m, ProductId = 4, PurchaseId = 4 },
        new Lot { LotCode = "20260504-5-7", EntryDate = ToUtc("2026-05-04T20:13:00Z"), UnitCost = 10.00m, InitialQuantity = 145.0000m, AvailableQuantity = 145.0000m, ProductId = 5, PurchaseId = 5 },
        new Lot { LotCode = "20260505-6-8", EntryDate = ToUtc("2026-05-05T23:21:00Z"), UnitCost = 40.00m, InitialQuantity = 267.0000m, AvailableQuantity = 267.0000m, ProductId = 6, PurchaseId = 6 },
        new Lot { LotCode = "20260504-7-9", EntryDate = ToUtc("2026-05-04T12:38:00Z"), UnitCost = 24.00m, InitialQuantity = 210.0000m, AvailableQuantity = 210.0000m, ProductId = 7, PurchaseId = 7 },
        new Lot { LotCode = "20260502-8-10", EntryDate = ToUtc("2026-05-02T13:08:00Z"), UnitCost = 40.00m, InitialQuantity = 900.0000m, AvailableQuantity = 870.0000m, ProductId = 8, PurchaseId = 8 },
        new Lot { LotCode = "20260502-9-11", EntryDate = ToUtc("2026-05-02T13:08:00Z"), UnitCost = 45.00m, InitialQuantity = 600.0000m, AvailableQuantity = 580.0000m, ProductId = 9, PurchaseId = 8 },
        new Lot { LotCode = "20260505-12-12", EntryDate = ToUtc("2026-05-05T16:01:00Z"), UnitCost = 80.00m, InitialQuantity = 150.0000m, AvailableQuantity = 135.0000m, ProductId = 12, PurchaseId = 9 },
        new Lot { LotCode = "20260504-10-13", EntryDate = ToUtc("2026-05-04T17:57:00Z"), UnitCost = 33.00m, InitialQuantity = 120.0000m, AvailableQuantity = 100.0000m, ProductId = 10, PurchaseId = 10 },
        new Lot { LotCode = "20260504-11-14", EntryDate = ToUtc("2026-05-04T17:57:00Z"), UnitCost = 15.00m, InitialQuantity = 80.0000m, AvailableQuantity = 80.0000m, ProductId = 11, PurchaseId = 10 }
    );

    await context.SaveChangesAsync();
  }

  private static async Task SeedSalesAsync(SigaDbContext context)
  {
    if (await context.Sales.AnyAsync()) return;

    static DateTime ToUtc(string date) => DateTime.Parse(date, null, System.Globalization.DateTimeStyles.RoundtripKind).ToUniversalTime();

    context.Sales.AddRange(
        new Sale { ReferenceInvoice = "TKT-20260505-BD4A", TotalRevenue = 4700.00m, OperationDate = ToUtc("2026-05-05T17:53:38Z"), Status = 0, UserId = 1 },
        new Sale { ReferenceInvoice = "TKT-20260506-1F6C", TotalRevenue = 1680.00m, OperationDate = ToUtc("2026-05-06T20:33:00Z"), Status = 0, UserId = 1 }
    );

    await context.SaveChangesAsync();

    context.SaleDetails.AddRange(
        new SaleDetails { QuantityRequested = 20.0000m, UnitSellingPrice = 39.00m, SaleId = 1, ProductId = 10 },
        new SaleDetails { QuantityRequested = 15.0000m, UnitSellingPrice = 88.00m, SaleId = 1, ProductId = 12 },
        new SaleDetails { QuantityRequested = 30.0000m, UnitSellingPrice = 50.00m, SaleId = 1, ProductId = 8 },
        new SaleDetails { QuantityRequested = 20.0000m, UnitSellingPrice = 55.00m, SaleId = 1, ProductId = 9 },

        new SaleDetails { QuantityRequested = 22.0000m, UnitSellingPrice = 30.00m, SaleId = 2, ProductId = 1 },
        new SaleDetails { QuantityRequested = 10.0000m, UnitSellingPrice = 60.00m, SaleId = 2, ProductId = 2 },
        new SaleDetails { QuantityRequested = 20.0000m, UnitSellingPrice = 21.00m, SaleId = 2, ProductId = 3 }
    );

    await context.SaveChangesAsync();

    context.SaleTransactions.AddRange(
        new SaleTransaction { QuantitySold = 20.0000m, UnitCostApplied = 33.00m, SaleDetailsId = 1, LotId = 11 },
        new SaleTransaction { QuantitySold = 15.0000m, UnitCostApplied = 80.00m, SaleDetailsId = 2, LotId = 10 },
        new SaleTransaction { QuantitySold = 30.0000m, UnitCostApplied = 40.00m, SaleDetailsId = 3, LotId = 8 },
        new SaleTransaction { QuantitySold = 20.0000m, UnitCostApplied = 45.00m, SaleDetailsId = 4, LotId = 9 },
        new SaleTransaction { QuantitySold = 22.0000m, UnitCostApplied = 20.00m, SaleDetailsId = 5, LotId = 1 },
        new SaleTransaction { QuantitySold = 10.0000m, UnitCostApplied = 50.00m, SaleDetailsId = 6, LotId = 2 },
        new SaleTransaction { QuantitySold = 20.0000m, UnitCostApplied = 17.00m, SaleDetailsId = 7, LotId = 3 }
    );

    await context.SaveChangesAsync();
  }
}