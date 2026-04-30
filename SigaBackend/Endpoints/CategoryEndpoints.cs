using Microsoft.AspNetCore.Authorization;
using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class CategoryEndpoints
{
  public static void MapCategoryEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/categories");

    group.MapPost("/", (CategoryCreateDto category, ICategoryService service) => service.CreateCategoryAsync(category)).WithName("CreateCategory").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });

    group.MapGet("/", ([AsParameters] PaginationParams queryParams, ICategoryService service) => service.GetCategoriesAsync(queryParams)).WithName("GetCategories").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}", (int Id, ICategoryService service) => service.GetCategoryByIdAsync(Id)).WithName("GetCategoryById").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}/products", (int Id, [AsParameters] PaginationParams queryParams, ICategoryService service) => service.GetProductsByCategoryAsync(Id, queryParams)).WithName("GetProductsByCategory").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/lookup", (ICategoryService service) => service.GetCategoriesLookupAsync()).WithName("GetCategoriesLookup").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapPut("/{id}", (int Id, CategoryBasicDto dto, ICategoryService service) => service.UpdateCategoryAsync(Id, dto)).WithName("UpdateCategory").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });

    group.MapDelete("/{id}", (int Id, ICategoryService service) => service.DeleteCategoryAsync(Id)).WithName("DeleteCategory").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });
  }
}