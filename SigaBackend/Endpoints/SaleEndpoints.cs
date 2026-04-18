using System.Security.Claims;
using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class SaleEndpoints
{
  public static void MapSaleEndpoints(this IEndpointRouteBuilder router)
  {
    var group = router.MapGroup("/api/sales");

    group.MapPost("/", (SaleCreateDto dto, ClaimsPrincipal claims, ISaleService service) => service.CreateSaleAsync(dto, claims)).WithName("CreateSale").RequireAuthorization();

    group.MapGet("/", ([AsParameters] PaginationParams queryParams, ISaleService service) => service.GetSalesAsync(queryParams)).WithName("GetSales").RequireAuthorization();

    group.MapGet("/{id}", (int Id, ISaleService service) => service.GetSaleByIdAsync(Id)).WithName("GetSaleById").RequireAuthorization();

    group.MapGet("/{id}/details", (int Id, [AsParameters] PaginationParams queryParams, ISaleService service) => service.GetSaleDetailsBySaleAsync(Id, queryParams)).WithName("GetSaleDetailsBySale").RequireAuthorization();

    group.MapDelete("/{id}", (int Id, ISaleService service) => service.CancelSaleAsync(Id)).WithName("CancelSale").RequireAuthorization();
  }
}