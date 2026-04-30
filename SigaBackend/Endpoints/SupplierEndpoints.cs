using Microsoft.AspNetCore.Authorization;
using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class SupplierEndpoints
{
  public static void MapSupplierEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/suppliers");

    group.MapPost("/", (SupplierCreateDto dto, ISupplierService service) => service.CreateSupplierAsync(dto)).WithName("CreateSupplier").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });

    group.MapGet("/", ([AsParameters] PaginationParams queryParams, ISupplierService service) => service.GetSuppliersAsync(queryParams)).WithName("GetSuppliers").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}", (int Id, ISupplierService service) => service.GetSupplierByIdAsync(Id)).WithName("GetSupplierById").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}/purchases", (int Id, [AsParameters] PaginationParams queryParams, ISupplierService service) => service.GetPurchasesBySupplierAsync(Id, queryParams)).WithName("GetPurchasesBySupplier").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/lookup", (ISupplierService service) => service.GetSuppliersLookupAsync()).WithName("GetSuppliersLookup").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapPut("/{id}", (int Id, SupplierBasicDto dto, ISupplierService service) => service.UpdateSupplierAsync(Id, dto)).WithName("UpdateSupplier").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });

    group.MapDelete("/{id}", (int Id, ISupplierService service) => service.DeleteSupplierAsync(Id)).WithName("DeleteSupplier").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });
  }
}