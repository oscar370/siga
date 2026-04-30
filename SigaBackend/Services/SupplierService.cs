using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Models;

namespace SigaBackend.Services;

interface ISupplierService
{
  Task<Results<Created<SupplierBasicDto>, BadRequest<string>>> CreateSupplierAsync(SupplierCreateDto dto);

  Task<Ok<PagedList<SupplierBasicDto>>> GetSuppliersAsync(PaginationParams queryParams);

  Task<Results<Ok<SupplierBasicDto>, NotFound<string>>> GetSupplierByIdAsync(int Id);

  Task<Ok<PagedList<PurchaseBasicDto>>> GetPurchasesBySupplierAsync(int Id, PaginationParams queryParams);

  Task<Ok<List<LookupDto>>> GetSuppliersLookupAsync();

  Task<Results<Ok<SupplierBasicDto>, BadRequest<string>>> UpdateSupplierAsync(int Id, SupplierBasicDto dto);

  Task<Results<Ok<int>, BadRequest<string>>> DeleteSupplierAsync(int Id);
}

public class SupplierService(SigaDbContext context) : ISupplierService
{
  private SigaDbContext _context = context;

  public async Task<Results<Created<SupplierBasicDto>, BadRequest<string>>> CreateSupplierAsync(SupplierCreateDto dto)
  {
    var supplier = dto.Adapt<Supplier>();

    _context.Suppliers.Add(supplier);
    await _context.SaveChangesAsync();

    var result = supplier.Adapt<SupplierBasicDto>();

    return TypedResults.Created($"/api/suppliers/{result.Id}", result);
  }

  public async Task<Ok<PagedList<SupplierBasicDto>>> GetSuppliersAsync(PaginationParams queryParams)
  {
    var query = _context.Suppliers
      .AsNoTracking()
      .Where(s => s.IsActive && s.DeletedAt == null);

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(c => c.Name.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var suppliers = await query
      .OrderByDescending(s => s.Name)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<SupplierBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<SupplierBasicDto>(
      suppliers,
      totalCount,
      queryParams.PageNumber,
      queryParams.PageSize
    );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Results<Ok<SupplierBasicDto>, NotFound<string>>> GetSupplierByIdAsync(int Id)
  {
    var supplier = await _context.Suppliers
      .AsNoTracking()
      .Where(s => s.Id == Id && s.IsActive && s.DeletedAt == null)
      .ProjectToType<SupplierBasicDto>()
      .FirstOrDefaultAsync();

    if (supplier is null) return TypedResults.NotFound("The supplier was not found");

    return TypedResults.Ok(supplier);
  }

  public async Task<Ok<PagedList<PurchaseBasicDto>>> GetPurchasesBySupplierAsync(int Id, PaginationParams queryParams)
  {
    var query = _context.Purchases
      .AsNoTracking()
      .Where((p) => p.SupplierId == Id);

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(p => p.ReferenceInvoice.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var purchases = await query
      .OrderByDescending(p => p.OperationDate)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<PurchaseBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<PurchaseBasicDto>(
     purchases,
     totalCount,
     queryParams.PageNumber,
     queryParams.PageSize
   );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Ok<List<LookupDto>>> GetSuppliersLookupAsync()
  {
    var categories = await _context.Suppliers
      .AsNoTracking()
      .Where(s => s.IsActive && s.DeletedAt == null)
      .OrderByDescending(s => s.Name)
      .ProjectToType<LookupDto>()
      .ToListAsync();

    return TypedResults.Ok(categories);
  }

  public async Task<Results<Ok<SupplierBasicDto>, BadRequest<string>>> UpdateSupplierAsync(int Id, SupplierBasicDto dto)
  {
    var supplier = await _context.Suppliers
      .Where(s => s.Id == Id)
      .FirstAsync();

    supplier.Name = dto.Name;
    supplier.TaxId = dto.TaxId;
    supplier.ContactInfo = dto.ContactInfo;

    await _context.SaveChangesAsync();

    return TypedResults.Ok(dto);
  }

  public async Task<Results<Ok<int>, BadRequest<string>>> DeleteSupplierAsync(int Id)
  {
    var supplier = await _context.Suppliers
      .Where(s => s.Id == Id)
      .FirstAsync();

    supplier.IsActive = false;
    supplier.DeletedAt = DateTimeOffset.UtcNow;

    await _context.SaveChangesAsync();

    return TypedResults.Ok(Id);
  }
}