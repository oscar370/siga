using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class LotEndpoints
{
  public static void MapLotEndpoints(this IEndpointRouteBuilder router)
  {
    var group = router.MapGroup("/api/lots");

    group.MapGet("/", (ILotService service) => service.GetLotsAsync()).WithName("GetLots");

    group.MapGet("/{Id}", (int Id, ILotService service) => service.GetLotByIdAsync(Id));
  }
}