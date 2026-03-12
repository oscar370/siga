using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class ProductEndpoints
{
  public static void MapProductEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/products");

    group.MapPost("/", (ProductCreateDto dto, IProductService service) => service.CreateProductAsync(dto)).WithName("CreateProduct");

    group.MapGet("/", (IProductService service) => service.GetProductsAsync()).WithName("GetProducts");

    group.MapGet("/{Id}", (int Id, IProductService service) => service.GetProductByIdAsync(Id));

    group.MapPut("/{Id}", (int Id, ProductBasicDto dto, IProductService service) => service.UpdateProductAsync(Id, dto));

    group.MapDelete("/{Id}", (int Id, IProductService service) => service.DeleteProductAsync(Id));
  }
}