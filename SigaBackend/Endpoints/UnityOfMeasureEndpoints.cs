using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class UnityOfMeasureEndpoints
{
  public static void MapUnityOfMeasureEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/units-of-measure");

    group.MapPost("/", (UnityOfMeasureCreateDto dto, IUnityOfMeasureService service) => service.CreateUnityOfMeasureAsync(dto)).WithName("CreateUnityOfMeasure");

    group.MapGet("/", (IUnityOfMeasureService service) => service.GetUnitsOfMeasureAsync()).WithName("GetUnitsOfMeasure");

    group.MapGet("/{Id}", (int Id, IUnityOfMeasureService service) => service.GetUnityOfMeasureByIdAsync(Id));

    group.MapPut("/{Id}", (int Id, UnityOfMeasureBasicDto dto, IUnityOfMeasureService service) => service.UpdateUnityOfMeasureAsync(Id, dto)).WithName("UpdateUnityOfMeasure");

    group.MapDelete("/{Id}", (int Id, IUnityOfMeasureService service) => service.DeleteUnityOfMeasureAsync(Id)).WithName("DeleteUnityOfMeasure");
  }
}