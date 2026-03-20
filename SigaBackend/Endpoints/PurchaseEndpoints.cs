using System.Security.Claims;
using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class PurchaseEndpoints
{
  public static void MapPurchaseEndpoints(this IEndpointRouteBuilder builder)
  {
    var group = builder.MapGroup("/api/purchases");

    group.MapPost("/", (PurchaseCreateDto dto, ClaimsPrincipal claims, IPurchaseService service) => service.CreatePurchaseAsync(dto, claims));

    group.MapGet("/", (IPurchaseService service) => service.GetPurchasesAsync());

    group.MapGet("/{Id}", (int Id, IPurchaseService service) => service.GetPurchaseByIdAsync(Id));

    group.MapDelete("/{Id}", (int Id, IPurchaseService service) => service.CancelPurchaseAsync(Id));
  }
}