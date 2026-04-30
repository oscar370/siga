using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Converters;
using SigaBackend.Data;
using SigaBackend.Endpoints;
using SigaBackend.Models;
using SigaBackend.Services;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<SigaDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddValidation();

// Identity
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<User>()
    .AddRoles<IdentityRole<int>>()
    .AddEntityFrameworkStores<SigaDbContext>();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.ExpireTimeSpan = TimeSpan.FromHours(8);
    options.SlidingExpiration = true;
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("Policy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Services
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IUnityOfMeasureService, UnityOfMeasureService>();
builder.Services.AddScoped<IPurchaseService, PurchaseService>();
builder.Services.AddScoped<IIdentityService, IdentityService>();
builder.Services.AddScoped<ILotService, LotService>();
builder.Services.AddScoped<ISaleService, SaleService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();

// Converters
builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new TrimStringConverter()));


var app = builder.Build();

// CORS
app.UseCors("Policy");

// Identity Middleware
app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "v1");
    });
    app.UseExceptionHandler(exceptionHandlerApp =>
    {
        exceptionHandlerApp.Run(async context =>
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            await context.Response.WriteAsJsonAsync(new
            {
                Error = "An unexpected error occurred",

            });
        });
    });
}

// Identity seed
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<SigaDbContext>();

    await context.Database.MigrateAsync();

    await DbSeeder.SeedRolesAndAdminAsync(services);
}

app.UseHttpsRedirection();

app.MapGroup("/api/auth").MapIdentityApi<User>();
app.MapIdentityEndpoints();
app.MapProductEndpoints();
app.MapCategoryEndpoints();
app.MapSupplierEndpoints();
app.MapUnityOfMeasureEndpoints();
app.MapPurchaseEndpoints();
app.MapLotEndpoints();
app.MapSaleEndpoints();
app.MapDashboardEndpoints();

app.Run();