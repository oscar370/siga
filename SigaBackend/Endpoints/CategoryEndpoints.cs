using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class CategoryEndpoints
{
  public static void MapCategoryEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/categories");

    group.MapPost("/", (CategoryCreateDto category, ICategoryService service) => service.CreateCategoryAsync(category)).WithName("CreateCategory");

    group.MapGet("/", (ICategoryService service) => service.GetCategoriesAsync()).WithName("GetCategories");

    group.MapGet("/{Id}", (int Id, ICategoryService service) => service.GetCategoryByIdAsync(Id)).WithName("GetCategoryById");

    group.MapPut("/{Id}", (int Id, CategoryBasicDto dto, ICategoryService service) => service.UpdateCategoryAsync(Id, dto)).WithName("UpdateCategory");

    group.MapDelete("/{Id}", (int Id, ICategoryService service) => service.DeleteCategoryAsync(Id)).WithName("DeleteCategory");
  }
}