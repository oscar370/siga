using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Models;

namespace SigaBackend.Services;

interface IUnityOfMeasureService
{
  Task<Results<Created<UnityOfMeasureBasicDto>, BadRequest<string>>> CreateUnityOfMeasureAsync(UnityOfMeasureCreateDto dto);
  Task<Results<Ok<List<UnityOfMeasureBasicDto>>, NotFound>> GetUnitsOfMeasureAsync();
  Task<Results<Ok<UnityOfMeasureExtendedDto>, NotFound>> GetUnityOfMeasureByIdAsync(int Id);
  Task<Results<Ok<UnityOfMeasureBasicDto>, BadRequest<string>>> UpdateUnityOfMeasureAsync(int Id, UnityOfMeasureBasicDto dto);
  Task<Results<Ok<int>, BadRequest<string>>> DeleteUnityOfMeasureAsync(int Id);
}

public class UnityOfMeasureService(SigaDbContext context) : IUnityOfMeasureService
{
  private SigaDbContext _context = context;

  public async Task<Results<Created<UnityOfMeasureBasicDto>, BadRequest<string>>> CreateUnityOfMeasureAsync(UnityOfMeasureCreateDto dto)
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

  public async Task<Results<Ok<List<UnityOfMeasureBasicDto>>, NotFound>> GetUnitsOfMeasureAsync()
  {
    var unitsOfMeasure = await _context.UnityOfMeasures
      .Select(um => new UnityOfMeasureBasicDto(um.UnityOfMeasureId, um.Name, um.Abbreviation))
      .ToListAsync();

    return TypedResults.Ok(unitsOfMeasure);
  }

  public async Task<Results<Ok<UnityOfMeasureExtendedDto>, NotFound>> GetUnityOfMeasureByIdAsync(int Id)
  {
    var unityOfMeasure = await _context.UnityOfMeasures
      .Where(um => um.UnityOfMeasureId == Id)
      .Select(um => new UnityOfMeasureExtendedDto(
        um.UnityOfMeasureId,
        um.Name,
        um.Abbreviation,
        um.Products.Select(p => new ProductBasicDto(
          p.ProductId,
          p.Name,
          p.SKU,
          p.Description,
          p.BasePrice,
          p.CategoryId,
          p.UnityOfMeasureId
        ))
        .ToList()
      ))
      .FirstAsync();

    return TypedResults.Ok(unityOfMeasure);
  }

  public async Task<Results<Ok<UnityOfMeasureBasicDto>, BadRequest<string>>> UpdateUnityOfMeasureAsync(int Id, UnityOfMeasureBasicDto dto)
  {
    var unityOfMeasure = await _context.UnityOfMeasures
      .Where(um => um.UnityOfMeasureId == Id)
      .FirstAsync();

    unityOfMeasure.Name = dto.Name;
    unityOfMeasure.Abbreviation = dto.Abbreviation;

    _context.UnityOfMeasures.Update(unityOfMeasure);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(dto);
  }

  public async Task<Results<Ok<int>, BadRequest<string>>> DeleteUnityOfMeasureAsync(int Id)
  {
    var unityOfMeasure = await _context.UnityOfMeasures
      .Where(um => um.UnityOfMeasureId == Id)
      .FirstAsync();

    _context.UnityOfMeasures.Remove(unityOfMeasure);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(Id);
  }
}