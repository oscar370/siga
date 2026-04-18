using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class UnityOfMeasureEndpoints
{
  public static void MapUnityOfMeasureEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/units-of-measure");

    group.MapPost("/", (UnityOfMeasureCreateDto dto, IUnityOfMeasureService service) => service.CreateUnityOfMeasureAsync(dto)).WithName("CreateUnityOfMeasure").RequireAuthorization();

    group.MapGet("/", ([AsParameters] PaginationParams queryParams, IUnityOfMeasureService service) => service.GetUnitsOfMeasureAsync(queryParams)).WithName("GetUnitsOfMeasure").RequireAuthorization();

    group.MapGet("/{id}", (int Id, IUnityOfMeasureService service) => service.GetUnityOfMeasureByIdAsync(Id)).WithName("GetUnityOfMeasureById").RequireAuthorization();

    group.MapGet("/{id}/products", (int Id, [AsParameters] PaginationParams queryParams, IUnityOfMeasureService service) => service.GetProductsByUnityOfMeasureAsync(Id, queryParams)).WithName("GetProductsByUnityOfMeasure").RequireAuthorization();

    group.MapGet("/lookup", (IUnityOfMeasureService service) => service.GetUnitsOfMeasureLookupAsync()).WithName("GetUnitsOfMeasureLookup").RequireAuthorization();

    group.MapPut("/{id}", (int Id, UnityOfMeasureBasicDto dto, IUnityOfMeasureService service) => service.UpdateUnityOfMeasureAsync(Id, dto)).WithName("UpdateUnityOfMeasure").RequireAuthorization();

    group.MapDelete("/{id}", (int Id, IUnityOfMeasureService service) => service.DeleteUnityOfMeasureAsync(Id)).WithName("DeleteUnityOfMeasure").RequireAuthorization();
  }
}