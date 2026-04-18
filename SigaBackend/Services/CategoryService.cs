using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Models;

namespace SigaBackend.Services;

public interface ICategoryService
{
  Task<Results<Created<CategoryBasicDto>, BadRequest<string>>> CreateCategoryAsync(CategoryCreateDto category);

  Task<Ok<PagedList<CategoryBasicDto>>> GetCategoriesAsync(PaginationParams queryParams);

  Task<Results<Ok<CategoryBasicDto>, NotFound<string>>> GetCategoryByIdAsync(int Id);

  Task<Ok<PagedList<ProductBasicDto>>> GetProductsByCategoryAsync(int Id, PaginationParams queryParams);

  Task<Ok<List<LookupDto>>> GetCategoriesLookupAsync();

  Task<Results<Ok<CategoryBasicDto>, BadRequest<string>>> UpdateCategoryAsync(int Id, CategoryBasicDto dto);

  Task<Results<Ok<int>, BadRequest<string>>> DeleteCategoryAsync(int Id);
}

public class CategoryService(SigaDbContext context) : ICategoryService
{
  private readonly SigaDbContext _context = context;

  public async Task<Results<Created<CategoryBasicDto>, BadRequest<string>>> CreateCategoryAsync(CategoryCreateDto dto)
  {
    var category = dto.Adapt<Category>();

    _context.Categories.Add(category);
    await _context.SaveChangesAsync();

    var result = category.Adapt<CategoryBasicDto>();

    return TypedResults.Created($"/api/categories/{result.Id}", result);
  }

  public async Task<Ok<PagedList<CategoryBasicDto>>> GetCategoriesAsync(PaginationParams queryParams)
  {
    var query = _context.Categories
      .AsNoTracking()
      .Where(c => c.IsActive && c.DeletedAt == null); ;

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(c => c.Name.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var categories = await query
      .OrderBy(c => c.Name)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<CategoryBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<CategoryBasicDto>(
      categories,
      totalCount,
      queryParams.PageNumber,
      queryParams.PageSize
    );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Results<Ok<CategoryBasicDto>, NotFound<string>>> GetCategoryByIdAsync(int Id)
  {
    var category = await _context.Categories
      .AsNoTracking()
      .Where(c => c.IsActive && c.DeletedAt == null && c.Id == Id)
      .ProjectToType<CategoryBasicDto>()
      .FirstOrDefaultAsync();

    if (category is null) return TypedResults.NotFound("The category was not found");

    return TypedResults.Ok(category);
  }

  public async Task<Ok<PagedList<ProductBasicDto>>> GetProductsByCategoryAsync(int Id, PaginationParams queryParams)
  {
    var query = _context.Products
      .AsNoTracking()
      .Where((p) => p.CategoryId == Id && p.IsActive && p.DeletedAt == null);

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(c => c.Name.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var products = await query
      .OrderBy(p => p.Name)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<ProductBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<ProductBasicDto>(
     products,
     totalCount,
     queryParams.PageNumber,
     queryParams.PageSize
   );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Ok<List<LookupDto>>> GetCategoriesLookupAsync()
  {
    var categories = await _context.Categories
      .AsNoTracking()
      .Where(c => c.IsActive && c.DeletedAt == null)
      .OrderBy(c => c.Name)
      .ProjectToType<LookupDto>()
      .ToListAsync();

    return TypedResults.Ok(categories);
  }

  public async Task<Results<Ok<CategoryBasicDto>, BadRequest<string>>> UpdateCategoryAsync(int Id, CategoryBasicDto dto)
  {
    var category = await _context.Categories
      .Where(c => c.Id == Id)
      .FirstOrDefaultAsync();

    if (category is null) return TypedResults.BadRequest("The category was not found");

    category.Name = dto.Name;
    category.Description = dto.Description;

    _context.Categories.Update(category);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(dto);
  }

  public async Task<Results<Ok<int>, BadRequest<string>>> DeleteCategoryAsync(int Id)
  {
    var category = await _context.Categories
      .Where(c => c.Id == Id)
      .FirstOrDefaultAsync();

    if (category is null) return TypedResults.BadRequest("The category was not found");

    category.IsActive = false;
    category.DeletedAt = DateTimeOffset.UtcNow;

    _context.Categories.Update(category);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(Id);
  }
}
