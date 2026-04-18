using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class CategoryEndpoints
{
  public static void MapCategoryEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/categories");

    group.MapPost("/", (CategoryCreateDto category, ICategoryService service) => service.CreateCategoryAsync(category)).WithName("CreateCategory").RequireAuthorization();

    group.MapGet("/", ([AsParameters] PaginationParams queryParams, ICategoryService service) => service.GetCategoriesAsync(queryParams)).WithName("GetCategories").RequireAuthorization();

    group.MapGet("/{id}", (int Id, ICategoryService service) => service.GetCategoryByIdAsync(Id)).WithName("GetCategoryById").RequireAuthorization();

    group.MapGet("/{id}/products", (int Id, [AsParameters] PaginationParams queryParams, ICategoryService service) => service.GetProductsByCategoryAsync(Id, queryParams)).WithName("GetProductsByCategory").RequireAuthorization();

    group.MapGet("/lookup", (ICategoryService service) => service.GetCategoriesLookupAsync()).WithName("GetCategoriesLookup").RequireAuthorization();

    group.MapPut("/{id}", (int Id, CategoryBasicDto dto, ICategoryService service) => service.UpdateCategoryAsync(Id, dto)).WithName("UpdateCategory").RequireAuthorization();

    group.MapDelete("/{id}", (int Id, ICategoryService service) => service.DeleteCategoryAsync(Id)).WithName("DeleteCategory").RequireAuthorization();
  }
}