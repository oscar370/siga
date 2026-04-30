using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;
using SigaBackend.Models;

namespace SigaBackend.Services;

interface IUnityOfMeasureService
{
  Task<Results<Created<UnityOfMeasureBasicDto>, BadRequest<string>>> CreateUnityOfMeasureAsync(UnityOfMeasureCreateDto dto);

  Task<Ok<PagedList<UnityOfMeasureBasicDto>>> GetUnitsOfMeasureAsync(PaginationParams queryParams);

  Task<Results<Ok<UnityOfMeasureBasicDto>, NotFound<string>>> GetUnityOfMeasureByIdAsync(int Id);

  Task<Ok<PagedList<ProductBasicDto>>> GetProductsByUnityOfMeasureAsync(int Id, PaginationParams queryParams);

  Task<Ok<List<LookupDto>>> GetUnitsOfMeasureLookupAsync();

  Task<Results<Ok<UnityOfMeasureBasicDto>, BadRequest<string>>> UpdateUnityOfMeasureAsync(int Id, UnityOfMeasureBasicDto dto);

  Task<Results<Ok<int>, BadRequest<string>>> DeleteUnityOfMeasureAsync(int Id);
}

public class UnityOfMeasureService(SigaDbContext context) : IUnityOfMeasureService
{
  private readonly SigaDbContext _context = context;

  public async Task<Results<Created<UnityOfMeasureBasicDto>, BadRequest<string>>> CreateUnityOfMeasureAsync(UnityOfMeasureCreateDto dto)
  {
    var unityOfMeasure = dto.Adapt<UnityOfMeasure>();

    _context.UnityOfMeasures.Add(unityOfMeasure);
    await _context.SaveChangesAsync();

    var result = unityOfMeasure.Adapt<UnityOfMeasureBasicDto>();

    return TypedResults.Created($"/api/units-of-measures/{result.Id}", result);
  }

  public async Task<Ok<PagedList<UnityOfMeasureBasicDto>>> GetUnitsOfMeasureAsync(PaginationParams queryParams)
  {
    var query = _context.UnityOfMeasures
      .AsNoTracking();

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(c => c.Name.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var unitsOfMeasure = await query
      .OrderByDescending(um => um.Name)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<UnityOfMeasureBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<UnityOfMeasureBasicDto>(
      unitsOfMeasure,
      totalCount,
      queryParams.PageNumber,
      queryParams.PageSize
    );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Results<Ok<UnityOfMeasureBasicDto>, NotFound<string>>> GetUnityOfMeasureByIdAsync(int Id)
  {
    var unityOfMeasure = await _context.UnityOfMeasures
      .AsNoTracking()
      .Where(um => um.Id == Id)
      .ProjectToType<UnityOfMeasureBasicDto>()
      .FirstOrDefaultAsync();

    if (unityOfMeasure is null) return TypedResults.NotFound("The unit of measure was not found");

    return TypedResults.Ok(unityOfMeasure);
  }

  public async Task<Ok<PagedList<ProductBasicDto>>> GetProductsByUnityOfMeasureAsync(int Id, PaginationParams queryParams)
  {
    var query = _context.Products
      .AsNoTracking()
      .Where((p) => p.UnityOfMeasureId == Id && p.IsActive && p.DeletedAt == null);

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(c => c.Name.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var products = await query
      .OrderByDescending(p => p.Name)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<ProductBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<ProductBasicDto>(
     products,
     totalCount,
     queryParams.PageNumber,
     queryParams.PageSize
   );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Ok<List<LookupDto>>> GetUnitsOfMeasureLookupAsync()
  {
    var unitsOfMeasure = await _context.UnityOfMeasures
      .AsNoTracking()
      .OrderByDescending(um => um.Name)
      .ProjectToType<LookupDto>()
      .ToListAsync();

    return TypedResults.Ok(unitsOfMeasure);
  }

  public async Task<Results<Ok<UnityOfMeasureBasicDto>, BadRequest<string>>> UpdateUnityOfMeasureAsync(int Id, UnityOfMeasureBasicDto dto)
  {
    var unityOfMeasure = await _context.UnityOfMeasures
      .Where(um => um.Id == Id)
      .FirstOrDefaultAsync();

    if (unityOfMeasure is null) return TypedResults.BadRequest("The unit of measure was not found");

    unityOfMeasure.Name = dto.Name;
    unityOfMeasure.Abbreviation = dto.Abbreviation;

    _context.UnityOfMeasures.Update(unityOfMeasure);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(dto);
  }

  public async Task<Results<Ok<int>, BadRequest<string>>> DeleteUnityOfMeasureAsync(int Id)
  {
    var unityOfMeasure = await _context.UnityOfMeasures
      .Where(um => um.Id == Id)
      .FirstOrDefaultAsync();

    if (unityOfMeasure is null) return TypedResults.BadRequest("The unit of measure was not found");

    _context.UnityOfMeasures.Remove(unityOfMeasure);
    await _context.SaveChangesAsync();

    return TypedResults.Ok(Id);
  }
}