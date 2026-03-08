using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.Models;

namespace SigaBackend.DTOs;

interface IUnityOfMeasureService
{
  Task<Results<Created<UnityOfMeasureBasicDto>, BadRequest<string>>> CreateUnityOfMeasure(UnityOfMeasureCreateDto dto);
  Task<Results<Ok<List<UnityOfMeasureBasicDto>>, NotFound>> GetUnitsOfMeasure();

}

public class UnityOfMeasureService(SigaDbContext context) : IUnityOfMeasureService
{
  private SigaDbContext _context = context;

  public async Task<Results<Created<UnityOfMeasureBasicDto>, BadRequest<string>>> CreateUnityOfMeasure(UnityOfMeasureCreateDto dto)
  {
    var unityOfMeasure = new UnityOfMeasure
    {
      Name = dto.Name,
      Abbreviation = dto.Abbreviation
    };

    _context.UnityOfMeasures.Add(unityOfMeasure);
    await _context.SaveChangesAsync();

    var result = new UnityOfMeasureBasicDto(unityOfMeasure.UnityOfMeasureId, unityOfMeasure.Name, unityOfMeasure.Abbreviation);

    return TypedResults.Created($"/api/units-of-measures/{result.Id}", result);
  }

  public async Task<Results<Ok<List<UnityOfMeasureBasicDto>>, NotFound>> GetUnitsOfMeasure()
  {
    var unitsOfMeasure = await _context.UnityOfMeasures
      .Select(um => new UnityOfMeasureBasicDto(um.UnityOfMeasureId, um.Name, um.Abbreviation))
      .ToListAsync();

    return TypedResults.Ok(unitsOfMeasure);
  }
}