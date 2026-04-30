using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Models;


namespace SigaBackend.Services;

interface IProductService
{
  Task<Results<Created<ProductBasicDto>, BadRequest<string>>> CreateProductAsync(ProductCreateDto dto);

  Task<Ok<PagedList<ProductExtendedDto>>> GetProductsAsync(PaginationParams queryParams);

  Task<Results<Ok<ProductExtendedDto>, NotFound<string>>> GetProductByIdAsync(int Id);

  Task<Ok<PagedList<LotBasicDto>>> GetLotsByProductAsync(int Id, PaginationParams queryParams);

  Task<Ok<List<LookupDto>>> GetProductsLookupAsync();

  Task<Results<Ok<ProductBasicDto>, BadRequest<string>>> UpdateProductAsync(int Id, ProductBasicDto dto);

  Task<Results<Ok<int>, BadRequest<string>>> DeleteProductAsync(int Id);
}

public class ProductService(SigaDbContext context) : IProductService
{
  private readonly SigaDbContext _context = context;

  public async Task<Results<Created<ProductBasicDto>, BadRequest<string>>> CreateProductAsync(ProductCreateDto dto)
  {
    bool categoryExist = await _context.Categories.AnyAsync(c => c.Id == dto.CategoryId);

    if (!categoryExist) return TypedResults.BadRequest("The category does not exist");

    var product = dto.Adapt<Product>();

    _context.Products.Add(product);
    await _context.SaveChangesAsync();

    var result = product.Adapt<ProductBasicDto>();

    return TypedResults.Created($"/api/products/{result.Id}", result);
  }

  public async Task<Ok<PagedList<ProductExtendedDto>>> GetProductsAsync(PaginationParams queryParams)
  {
    var query = _context.Products
      .AsNoTracking()
      .Where(c => c.IsActive && c.DeletedAt == null);

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(c => c.Name.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var products = await query
      .OrderByDescending(c => c.Name)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<ProductExtendedDto>()
      .ToListAsync();

    var pagedResults = new PagedList<ProductExtendedDto>(
      products,
      totalCount,
      queryParams.PageNumber,
      queryParams.PageSize
    );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Results<Ok<ProductExtendedDto>, NotFound<string>>> GetProductByIdAsync(int Id)
  {
    var product = await _context.Products
      .AsNoTracking()
      .Where(p => p.Id == Id && p.IsActive && p.DeletedAt == null)
      .ProjectToType<ProductExtendedDto>()
      .FirstOrDefaultAsync();

    if (product is null) return TypedResults.NotFound("The product was not found");

    return TypedResults.Ok(product);
  }

  public async Task<Ok<PagedList<LotBasicDto>>> GetLotsByProductAsync(int Id, PaginationParams queryParams)
  {
    var query = _context.Lots
      .AsNoTracking()
      .Where((l) => l.ProductId == Id);

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(p => p.LotCode.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var lots = await query
      .OrderByDescending(l => l.EntryDate)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<LotBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<LotBasicDto>(
     lots,
     totalCount,
     queryParams.PageNumber,
     queryParams.PageSize
   );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Ok<List<LookupDto>>> GetProductsLookupAsync()
  {
    var products = await _context.Products
      .AsNoTracking()
      .Where(p => p.IsActive && p.DeletedAt == null)
      .OrderByDescending(p => p.Name)
      .ProjectToType<LookupDto>()
      .ToListAsync();

    return TypedResults.Ok(products);
  }

  public async Task<Results<Ok<ProductBasicDto>, BadRequest<string>>> UpdateProductAsync(int Id, ProductBasicDto dto)
  {
    var product = await _context.Products
      .Where(p => p.Id == Id && p.IsActive && p.DeletedAt == null)
      .FirstOrDefaultAsync();

    if (product is null) return TypedResults.BadRequest("The product was not found");

    product.Name = dto.Name;
    product.SKU = dto.SKU;
    product.Description = dto.Description;
    product.BasePrice = dto.BasePrice;
    product.CategoryId = dto.CategoryId;
    product.UnityOfMeasureId = dto.UnityOfMeasureId;

    _context.Products.Update(product);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(dto);
  }

  public async Task<Results<Ok<int>, BadRequest<string>>> DeleteProductAsync(int Id)
  {
    var product = await _context.Products
      .Where(p => p.Id == Id && p.IsActive && p.DeletedAt == null)
      .FirstOrDefaultAsync();

    if (product is null) return TypedResults.BadRequest("The product was not found");

    product.IsActive = false;
    product.DeletedAt = DateTimeOffset.UtcNow;
    _context.Products.Update(product);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(Id);
  }
}