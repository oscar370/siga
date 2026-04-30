using Microsoft.AspNetCore.Authorization;
using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class UnityOfMeasureEndpoints
{
  public static void MapUnityOfMeasureEndpoints(this IEndpointRouteBuilder routes)
  {
    var group = routes.MapGroup("/api/units-of-measure");

    group.MapPost("/", (UnityOfMeasureCreateDto dto, IUnityOfMeasureService service) => service.CreateUnityOfMeasureAsync(dto)).WithName("CreateUnityOfMeasure").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });

    group.MapGet("/", ([AsParameters] PaginationParams queryParams, IUnityOfMeasureService service) => service.GetUnitsOfMeasureAsync(queryParams)).WithName("GetUnitsOfMeasure").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}", (int Id, IUnityOfMeasureService service) => service.GetUnityOfMeasureByIdAsync(Id)).WithName("GetUnityOfMeasureById").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/{id}/products", (int Id, [AsParameters] PaginationParams queryParams, IUnityOfMeasureService service) => service.GetProductsByUnityOfMeasureAsync(Id, queryParams)).WithName("GetProductsByUnityOfMeasure").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/lookup", (IUnityOfMeasureService service) => service.GetUnitsOfMeasureLookupAsync()).WithName("GetUnitsOfMeasureLookup").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapPut("/{id}", (int Id, UnityOfMeasureBasicDto dto, IUnityOfMeasureService service) => service.UpdateUnityOfMeasureAsync(Id, dto)).WithName("UpdateUnityOfMeasure").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });

    group.MapDelete("/{id}", (int Id, IUnityOfMeasureService service) => service.DeleteUnityOfMeasureAsync(Id)).WithName("DeleteUnityOfMeasure").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin" });
  }
}