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
  }
}