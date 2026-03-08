using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Endpoints;
using SigaBackend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddValidation();
builder.Services.AddDbContext<SigaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Services
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IUnityOfMeasureService, UnityOfMeasureService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseExceptionHandler(exceptionHandlerApp =>
    {
        exceptionHandlerApp.Run(async context =>
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            await context.Response.WriteAsJsonAsync(new
            {
                Error = "Ocurrió un error inesperado.",
                Detalles = "Consulte al administrador."
            });
        });
    });
}

app.UseHttpsRedirection();

app.MapProductEndpoints();
app.MapCategoryEndpoints();
app.MapSupplierEndpoints();
app.MapUnityOfMeasureEndpoints();

app.Run();
