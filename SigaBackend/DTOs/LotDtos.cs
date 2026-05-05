using System.ComponentModel.DataAnnotations;

namespace SigaBackend.DTOs;

public abstract record LotBaseDto
{
  public required int Id { get; set; }

  [MaxLength(100), MinLength(1)]
  public required string LotCode { get; set; }

  public required DateTimeOffset EntryDate { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  public required decimal UnitCost { get; set; }

  [Range(0.0001, (double)decimal.MaxValue)]
  public required decimal AvailableQuantity { get; set; }

  public required int ProductId { get; set; }

  public required int PurchaseId { get; set; }

  public required ProductBasicDto Product { get; set; }
}

public record LotBasicDto : LotBaseDto;

public record LotExtended : LotBaseDto
{
  public required PurchaseBasicDto Purchase { get; set; }
};