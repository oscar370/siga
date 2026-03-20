using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SigaBackend.Models;

namespace SigaBackend.DTOs;

public record PurchaseCreateDto
{
  private string referenceInvoice = string.Empty;
  [MaxLength(50)]
  [MinLength(1)]
  public required string ReferenceInvoice { get => referenceInvoice; set => referenceInvoice = value.Trim(); }
  public required DateTimeOffset OperationDate { get; set; }
  public required int SupplierId { get; set; }
  public required List<PurchaseItemCreateDto> PurchaseItems { get; set; }
}

public record PurchaseItemCreateDto
{
  public required int ProductId { get; set; }
  [Column(TypeName = "decimal(18,4)")]
  public required decimal Quantity { get; set; }
  [Column(TypeName = "decimal(18,2)")]
  public required decimal UnitCost { get; set; }
}

public record PurchaseBasicDto(int Id, string ReferenceInvoice, DateTimeOffset OperationDate, decimal TotalAmount, Status Status, int SupplierId, int UserId);

public record PurchaseExtendedDto(int Id, string ReferenceInvoice, DateTimeOffset OperationDate, decimal TotalAmount, Status Status, int SupplierId, int UserId, SupplierBasicDto Supplier, UserBasicDto User, List<LotBasicDto> Lots);