using Microsoft.AspNetCore.Authorization;
using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class LotEndpoints
{
  public static void MapLotEndpoints(this IEndpointRouteBuilder router)
  {
    var group = router.MapGroup("/api/lots");

    group.MapGet("/", ([AsParameters] PaginationParams queryParams, ILotService service) => service.GetLotsAsync(queryParams)).WithName("GetLots").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}", (int Id, ILotService service) => service.GetLotByIdAsync(Id)).WithName("GetLotById").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });
  }
}