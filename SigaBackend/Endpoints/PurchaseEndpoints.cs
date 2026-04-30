using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class PurchaseEndpoints
{
  public static void MapPurchaseEndpoints(this IEndpointRouteBuilder builder)
  {
    var group = builder.MapGroup("/api/purchases");

    group.MapPost("/", (PurchaseCreateDto dto, ClaimsPrincipal claims, IPurchaseService service) => service.CreatePurchaseAsync(dto, claims)).WithName("CreatePurchase").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });

    group.MapGet("/", ([AsParameters] PaginationParams queryParams, IPurchaseService service) => service.GetPurchasesAsync(queryParams)).WithName("GetPurchases").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}", (int Id, IPurchaseService service) => service.GetPurchaseByIdAsync(Id)).WithName("GetPurchaseById").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}/lots", (int Id, [AsParameters] PaginationParams queryParams, IPurchaseService service) => service.GetLotsByPurchaseAsync(Id, queryParams)).WithName("GetLotsByPurchase").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapDelete("/{id}", (int Id, IPurchaseService service) => service.CancelPurchaseAsync(Id)).WithName("CancelPurchase").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });
  }
}