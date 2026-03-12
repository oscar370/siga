using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Models;

namespace SigaBackend.Services;

public interface ICategoryService
{
  Task<Results<Created<CategoryBasicDto>, BadRequest<string>>> CreateCategoryAsync(CategoryCreateDto category);
  Task<Results<Ok<List<CategoryBasicDto>>, NotFound>> GetCategoriesAsync();
  Task<Results<Ok<CategoryExtendedDto>, NotFound>> GetCategoryByIdAsync(int Id);
  Task<Results<Ok<CategoryBasicDto>, BadRequest<string>>> UpdateCategoryAsync(int Id, CategoryBasicDto dto);
  Task<Results<Ok<int>, BadRequest<string>>> DeleteCategoryAsync(int Id);
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

  public async Task<Results<Ok<CategoryExtendedDto>, NotFound>> GetCategoryByIdAsync(int Id)
  {
    var category = await _context.Categories
      .Where(c => c.IsActive && c.DeletedAt == null && c.CategoryId == Id)
      .Select(c => new CategoryExtendedDto(
        c.CategoryId,
        c.Name,
        c.Description,
        c.Products.Select(p => new ProductBasicDto(
          p.ProductId,
          p.Name,
          p.SKU,
          p.Description,
          p.BasePrice,
          p.CategoryId,
          p.UnityOfMeasureId
        )).ToList()
      ))
      .FirstAsync();

    if (category == null) return TypedResults.NotFound();

    return TypedResults.Ok(category);
  }

  public async Task<Results<Ok<CategoryBasicDto>, BadRequest<string>>> UpdateCategoryAsync(int Id, CategoryBasicDto dto)
  {
    var category = await _context.Categories
      .Where(c => c.CategoryId == Id)
      .FirstAsync();

    if (category == null) return TypedResults.BadRequest("The category was not found. Please verify the ID");

    category.Name = dto.Name;
    category.Description = dto.Description;

    _context.Categories.Update(category);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(dto);
  }

  public async Task<Results<Ok<int>, BadRequest<string>>> DeleteCategoryAsync(int Id)
  {
    var category = await _context.Categories.Where(c => c.CategoryId == Id).FirstAsync();

    if (category == null) return TypedResults.BadRequest("The category was not found. Please verify the ID");

    category.IsActive = false;
    category.DeletedAt = DateTime.UtcNow;

    _context.Categories.Update(category);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(Id);
  }
}
