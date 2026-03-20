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
  Task<Results<Ok<List<ProductExtendedDto>>, NotFound>> GetProductsAsync();
  Task<Results<Ok<ProductExtendedDto>, NotFound>> GetProductByIdAsync(int Id);
  Task<Results<Ok<ProductBasicDto>, BadRequest<string>>> UpdateProductAsync(int Id, ProductBasicDto dto);
  Task<Results<Ok<int>, BadRequest<string>>> DeleteProductAsync(int Id);
}

public class ProductService(SigaDbContext context) : IProductService
{
  private readonly SigaDbContext _context = context;

  public async Task<Results<Created<ProductBasicDto>, BadRequest<string>>> CreateProductAsync(ProductCreateDto dto)
  {
    bool categoryExist = await _context.Categories.AnyAsync(c => c.CategoryId == dto.CategoryId);

    if (!categoryExist)
    {
      return TypedResults.BadRequest("The category does not exist");
    }

    var product = new Product
    {
      Name = dto.Name,
      SKU = dto.SKU,
      Description = dto.Description,
      BasePrice = dto.BasePrice,
      CategoryId = dto.CategoryId,
      UnityOfMeasureId = dto.UnityOfMeasureId
    };

    _context.Products.Add(product);
    await _context.SaveChangesAsync();

    var result = new ProductBasicDto(product.ProductId, product.Name, product.SKU, product.Description, product.BasePrice, product.CategoryId, product.UnityOfMeasureId);

    return TypedResults.Created($"/api/products/{product.ProductId}", result);
  }

  public async Task<Results<Ok<List<ProductExtendedDto>>, NotFound>> GetProductsAsync()
  {
    var products = await _context.Products
      .Where(p => p.IsActive && p.DeletedAt == null)
      .Select(p => new ProductExtendedDto(p.ProductId,
        p.Name,
        p.SKU,
        p.Description,
        p.BasePrice,
        p.CategoryId,
        p.UnityOfMeasureId,
        new CategoryBasicDto(p.Category.CategoryId,
          p.Category.Name,
          p.Category.Description),
        new UnityOfMeasureBasicDto(p.UnityOfMeasure.UnityOfMeasureId,
          p.UnityOfMeasure.Name,
          p.UnityOfMeasure.Abbreviation)
        ))
      .ToListAsync();

    return TypedResults.Ok(products);
  }

  public async Task<Results<Ok<ProductExtendedDto>, NotFound>> GetProductByIdAsync(int Id)
  {
    var product = await _context.Products
      .Where(p => p.ProductId == Id && p.IsActive && p.DeletedAt == null)
      .Select(p => new ProductExtendedDto(
        p.ProductId,
        p.Name,
        p.SKU,
        p.Description,
        p.BasePrice,
        p.CategoryId,
        p.UnityOfMeasureId,
        new CategoryBasicDto(p.Category!.CategoryId, p.Category.Name, p.Category.Description),
        new UnityOfMeasureBasicDto(p.UnityOfMeasure!.UnityOfMeasureId, p.UnityOfMeasure.Name, p.UnityOfMeasure.Abbreviation)
      ))
      .FirstAsync();

    return TypedResults.Ok(product);
  }

  public async Task<Results<Ok<ProductBasicDto>, BadRequest<string>>> UpdateProductAsync(int Id, ProductBasicDto dto)
  {
    var product = await _context.Products
      .Where(p => p.ProductId == Id && p.IsActive && p.DeletedAt == null)
      .FirstAsync();

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
      .Where(p => p.ProductId == Id && p.IsActive && p.DeletedAt == null)
      .FirstAsync();

    product.IsActive = false;
    product.DeletedAt = DateTimeOffset.UtcNow;
    _context.Products.Update(product);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(Id);
  }
}