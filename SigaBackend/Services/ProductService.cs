using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Models;


namespace SigaBackend.Services;

interface IProductService
{
  Task<Results<Created<ProductBasicDto>, BadRequest<string>>> CreateProductAsync(ProductCreateDto dto);

  Task<Results<Ok<List<ProductExtendedDto>>, BadRequest<string>>> GetProductsAsync();
}

public class ProductService(SigaDbContext context) : IProductService
{
  private SigaDbContext _context = context;

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

  public async Task<Results<Ok<List<ProductExtendedDto>>, BadRequest<string>>> GetProductsAsync()
  {
    var products = await _context.Products
      .Where(p => p.IsActive && p.DeletedAt == null)
      .Include(p => p.UnityOfMeasure)
      .Include(p => p.UnityOfMeasure)
      .Select(p => new ProductExtendedDto(p.ProductId,
        p.Name,
        p.SKU,
        p.Description,
        p.BasePrice,
        p.CategoryId,
        p.UnityOfMeasureId,
        new CategoryBasicDto(p.Category!.CategoryId,
          p.Category.Name,
          p.Category.Description),
        new UnityOfMeasureBasicDto(p.UnityOfMeasure!.UnityOfMeasureId,
          p.UnityOfMeasure.Name,
          p.UnityOfMeasure.Abbreviation)
        ))
      .ToListAsync();

    return TypedResults.Ok(products);
  }
}