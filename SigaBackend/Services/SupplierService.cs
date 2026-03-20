using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Models;

namespace SigaBackend.Services;

interface ISupplierService
{
  Task<Results<Created<SupplierBasicDto>, BadRequest<string>>> CreateSupplierAsync(SupplierCreateDto dto);
  Task<Results<Ok<List<SupplierBasicDto>>, NotFound>> GetSuppliersAsync();
  Task<Results<Ok<SupplierExtendedDto>, NotFound>> GetSupplierByIdAsync(int Id);
  Task<Results<Ok<SupplierBasicDto>, BadRequest<string>>> UpdateSupplierAsync(int Id, SupplierBasicDto dto);
  Task<Results<Ok<int>, BadRequest<string>>> DeleteSupplierAsync(int Id);
}

public class SupplierService(SigaDbContext context) : ISupplierService
{
  private SigaDbContext _context = context;

  public async Task<Results<Created<SupplierBasicDto>, BadRequest<string>>> CreateSupplierAsync(SupplierCreateDto dto)
  {
    var supplier = new Supplier
    {
      Name = dto.Name,
      TaxId = dto.TaxId,
      ContactInfo = dto.ContactInfo
    };

    _context.Suppliers.Add(supplier);
    await _context.SaveChangesAsync();

    var result = new SupplierBasicDto(supplier.SupplierId, supplier.Name, supplier.TaxId, supplier.ContactInfo);

    return TypedResults.Created($"/api/suppliers/{supplier.SupplierId}", result);
  }

  public async Task<Results<Ok<List<SupplierBasicDto>>, NotFound>> GetSuppliersAsync()
  {
    var suppliers = await _context.Suppliers
      .Where(s => s.IsActive && s.DeletedAt == null)
      .Select(s => new SupplierBasicDto(s.SupplierId, s.Name, s.TaxId, s.ContactInfo))
      .ToListAsync();

    return TypedResults.Ok(suppliers);
  }

  public async Task<Results<Ok<SupplierExtendedDto>, NotFound>> GetSupplierByIdAsync(int Id)
  {
    var supplier = await _context.Suppliers
      .Where(s => s.SupplierId == Id)
      .Select(s => new SupplierExtendedDto(
        s.SupplierId,
        s.Name,
        s.TaxId,
        s.ContactInfo,
        s.Purchases.Select(p => new PurchaseBasicDto(
          p.PurchaseId,
          p.ReferenceInvoice,
          p.OperationDate,
          p.TotalAmount,
          p.Status,
          p.SupplierId,
          p.UserId
        ))
      ))
      .FirstAsync();

    return TypedResults.Ok(supplier);
  }

  public async Task<Results<Ok<SupplierBasicDto>, BadRequest<string>>> UpdateSupplierAsync(int Id, SupplierBasicDto dto)
  {
    var supplier = await _context.Suppliers
      .Where(s => s.SupplierId == Id)
      .FirstAsync();

    supplier.Name = dto.Name;
    supplier.TaxId = dto.TaxId;
    supplier.ContactInfo = dto.ContactInfo;

    await _context.SaveChangesAsync();

    var result = new SupplierBasicDto(
      supplier.SupplierId,
      supplier.Name,
      supplier.TaxId,
      supplier.ContactInfo
    );

    return TypedResults.Ok(result);
  }

  public async Task<Results<Ok<int>, BadRequest<string>>> DeleteSupplierAsync(int Id)
  {
    var supplier = await _context.Suppliers
      .Where(s => s.SupplierId == Id)
      .FirstAsync();

    supplier.IsActive = false;
    supplier.DeletedAt = DateTimeOffset.UtcNow;

    await _context.SaveChangesAsync();

    return TypedResults.Ok(Id);
  }
}