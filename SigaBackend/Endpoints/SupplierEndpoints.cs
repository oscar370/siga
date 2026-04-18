using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class SupplierEndpoints
{
  public static void MapSupplierEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/suppliers");

    group.MapPost("/", (SupplierCreateDto dto, ISupplierService service) => service.CreateSupplierAsync(dto)).WithName("CreateSupplier").RequireAuthorization();

    group.MapGet("/", ([AsParameters] PaginationParams queryParams, ISupplierService service) => service.GetSuppliersAsync(queryParams)).WithName("GetSuppliers").RequireAuthorization();

    group.MapGet("/{id}", (int Id, ISupplierService service) => service.GetSupplierByIdAsync(Id)).WithName("GetSupplierById").RequireAuthorization();

    group.MapGet("/{id}/purchases", (int Id, [AsParameters] PaginationParams queryParams, ISupplierService service) => service.GetPurchasesBySupplierAsync(Id, queryParams)).WithName("GetPurchasesBySupplier").RequireAuthorization();

    group.MapGet("/lookup", (ISupplierService service) => service.GetSuppliersLookupAsync()).WithName("GetSuppliersLookup").RequireAuthorization();

    group.MapPut("/{id}", (int Id, SupplierBasicDto dto, ISupplierService service) => service.UpdateSupplierAsync(Id, dto)).WithName("UpdateSupplier").RequireAuthorization();

    group.MapDelete("/{id}", (int Id, ISupplierService service) => service.DeleteSupplierAsync(Id)).WithName("DeleteSupplier").RequireAuthorization();
  }
}