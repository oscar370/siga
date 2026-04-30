using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SigaBackend.Enums;

namespace SigaBackend.DTOs;

public abstract record SaleBaseDto
{
  public required int Id { get; set; }

  [MaxLength(50), MinLength(1)]
  public required string ReferenceInvoice { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  public required decimal TotalRevenue { get; set; }

  public required DateTime OperationDate { get; set; }

  public required Status Status { get; set; }

  public required int UserId { get; set; }

  public required UserBasicDto User { get; set; }
}

public record SaleCreateDto
{
  public DateTime OperationDate { get; set; }

  [MinLength(1)]
  public required ICollection<SaleItemCreateDto> Items { get; set; }
}

public record SaleBasicDto : SaleBaseDto;

public record SaleExtendedDto : SaleBaseDto
{
  public required ICollection<SaleDetailsExtendedDto> Details { get; set; }
}

public record SaleItemCreateDto
{
  public required int ProductId { get; set; }

  [Range(0.0001, (double)decimal.MaxValue)]
  public required decimal Quantity { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  public required decimal UnitPrice { get; set; }
}