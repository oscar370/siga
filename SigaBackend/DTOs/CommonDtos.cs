namespace SigaBackend.DTOs;

public record PaginationParams
{
  private const int MaxPageSize = 50;

  public int PageNumber { get; init; } = 1;

  private int _pageSize = 10;
  public int PageSize
  {
    get => _pageSize;
    init => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
  }

  public string? SearchTerm { get; init; }
}

public record PagedList<T>(
    IEnumerable<T> Items,
    int TotalCount,
    int PageNumber,
    int PageSize)
{
  public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
  public bool HasNextPage => PageNumber < TotalPages;
  public bool HasPreviousPage => PageNumber > 1;
}

public record LookupDto(int Id, string Name);
