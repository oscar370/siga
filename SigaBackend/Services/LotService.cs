using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.DTOs;

namespace SigaBackend.Services;

interface ILotService
{
  Task<Ok<PagedList<LotBasicDto>>> GetLotsAsync(PaginationParams queryParams);
  Task<Results<Ok<LotExtended>, NotFound<string>>> GetLotByIdAsync(int Id);
}

public class LotService(SigaDbContext context) : ILotService
{
  private readonly SigaDbContext _context = context;

  public async Task<Ok<PagedList<LotBasicDto>>> GetLotsAsync(PaginationParams queryParams)
  {
    var query = _context.Lots
      .AsNoTracking();

    if (!string.IsNullOrWhiteSpace(queryParams.SearchTerm))
      query = query.Where(p => p.LotCode.Contains(queryParams.SearchTerm));

    var totalCount = await query.CountAsync();
    var page = queryParams.PageNumber < 1 ? 1 : queryParams.PageNumber;
    var skip = (page - 1) * queryParams.PageSize;

    var lots = await query
      .OrderByDescending(l => l.EntryDate)
      .Skip(Math.Max(0, skip))
      .Take(queryParams.PageSize)
      .ProjectToType<LotBasicDto>()
      .ToListAsync();

    var pagedResults = new PagedList<LotBasicDto>(
     lots,
     totalCount,
     queryParams.PageNumber,
     queryParams.PageSize
   );

    return TypedResults.Ok(pagedResults);
  }

  public async Task<Results<Ok<LotExtended>, NotFound<string>>> GetLotByIdAsync(int Id)
  {
    var lot = await _context.Lots
      .Where(l => l.Id == Id)
      .ProjectToType<LotExtended>()
      .FirstOrDefaultAsync();

    if (lot is null) return TypedResults.NotFound("The lot was not found");

    return TypedResults.Ok(lot);
  }
}