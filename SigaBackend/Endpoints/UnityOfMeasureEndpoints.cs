using SigaBackend.DTOs;

namespace SigaBackend.Endpoints;

public static class UnityOfMeasureEndpoints
{
  public static void MapUnityOfMeasureEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/units-of-measure");

    group.MapPost("/", (UnityOfMeasureCreateDto dto, IUnityOfMeasureService service) => service.CreateUnityOfMeasure(dto));

    group.MapGet("/", (IUnityOfMeasureService service) => service.GetUnitsOfMeasure());
  }
}