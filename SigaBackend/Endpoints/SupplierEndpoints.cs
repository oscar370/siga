using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class SupplierEndpoints
{
  public static void MapSupplierEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/suppliers");

    group.MapPost("/", (SupplierCreateDto dto, ISupplierService service) => service.CreateSupplierAsync(dto)).WithName("CreateSupplier");

    group.MapGet("/", (ISupplierService service) => service.GetSuppliersAsync()).WithDisplayName("GetSuppliers");
  }
}