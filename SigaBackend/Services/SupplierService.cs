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
}