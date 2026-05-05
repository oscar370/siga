using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SigaBackend.Enums;

namespace SigaBackend.DTOs;

public abstract record PurchaseBaseDto
{
  public required int Id { get; set; }

  [MaxLength(50), MinLength(1)]
  public required string ReferenceInvoice { get; set; }

  [Range(0.01, (double)decimal.MaxValue)]
  public required decimal TotalCost { get; set; }

  public required DateTimeOffset OperationDate { get; set; }

  public required Status Status { get; set; }

  public required int SupplierId { get; set; }

  public required int UserId { get; set; }
}

public record PurchaseCreateDto
{
  [MaxLength(50), MinLength(1)]
  public required string ReferenceInvoice { get; set; }

  public required DateTimeOffset OperationDate { get; set; }

  public required int SupplierId { get; set; }

  public required List<PurchaseItemCreateDto> PurchaseItems { get; set; }
}

public record PurchaseBasicDto : PurchaseBaseDto;

public record PurchaseExtendedDto : PurchaseBaseDto
{
  public required SupplierBasicDto Supplier { get; set; }

  public required UserBasicDto User { get; set; }
}

public abstract record PurchaseItemBaseDto
{
  public required int ProductId { get; set; }

  [Range(0.0001, (double)decimal.MaxValue)]
  public required decimal Quantity { get; set; }

  [Range(0.00, (double)decimal.MaxValue)]
  public required decimal UnitCost { get; set; }
}

public record PurchaseItemCreateDto : PurchaseItemBaseDto;