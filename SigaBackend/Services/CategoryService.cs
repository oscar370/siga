using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Models;

namespace SigaBackend.Services;

public interface ICategoryService
{
  Task<Results<Created<CategoryBasicDto>, BadRequest<string>>> CreateCategoryAsync(CategoryCreateDto category);
  Task<Results<Ok<List<CategoryBasicDto>>, NotFound>> GetCategoriesAsync();
}

public class CategoryService(SigaDbContext context) : ICategoryService
{
  private readonly SigaDbContext _context = context;

  public async Task<Results<Created<CategoryBasicDto>, BadRequest<string>>> CreateCategoryAsync(CategoryCreateDto dto)
  {
    var category = new Category
    {
      Name = dto.Name,
      Description = dto.Description
    };

    _context.Categories.Add(category);
    await _context.SaveChangesAsync();

    var result = new CategoryBasicDto(category.CategoryId, category.Name, category.Description);

    return TypedResults.Created($"/api/categories/{category.CategoryId}", result);
  }

  public async Task<Results<Ok<List<CategoryBasicDto>>, NotFound>> GetCategoriesAsync()
  {
    var categories = await _context.Categories
      .Where(c => c.IsActive && c.DeletedAt == null)
      .Select(c => new CategoryBasicDto(c.CategoryId, c.Name, c.Description))
      .ToListAsync();

    return TypedResults.Ok(categories);
  }
}
