using SigaBackend.DTOs;
using SigaBackend.Models;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class CategoryEndpoints
{
  public static void MapCategoryEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/categories");

    group.MapPost("/", (CategoryCreateDto category, ICategoryService service) => service.CreateCategoryAsync(category)).WithName("CreateCategory");

    group.MapGet("/", (ICategoryService service) => service.GetCategoriesAsync()).WithName("GetCategories");
  }
}