using Microsoft.AspNetCore.Authorization;
using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class ProductEndpoints
{
  public static void MapProductEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/products");

    group.MapPost("/", (ProductCreateDto dto, IProductService service) => service.CreateProductAsync(dto)).WithName("CreateProduct").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });

    group.MapGet("/", ([AsParameters] PaginationParams queryParams, IProductService service) => service.GetProductsAsync(queryParams)).WithName("GetProducts").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}", (int Id, IProductService service) => service.GetProductByIdAsync(Id)).WithName("GetProductById").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}/lots", (int Id, [AsParameters] PaginationParams queryParams, IProductService service) => service.GetLotsByProductAsync(Id, queryParams)).WithName("GetLotsByProduct").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/lookup", (IProductService service) => service.GetProductsLookupAsync()).WithName("GetProductsLookup").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapPut("/{id}", (int Id, ProductBasicDto dto, IProductService service) => service.UpdateProductAsync(Id, dto)).WithName("UpdateProduct").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });

    group.MapDelete("/{id}", (int Id, IProductService service) => service.DeleteProductAsync(Id)).WithName("DeleteProduct").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });
  }
}