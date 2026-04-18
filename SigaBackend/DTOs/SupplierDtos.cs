using System.ComponentModel.DataAnnotations;

namespace SigaBackend.DTOs;

public abstract record SupplierBaseDto
{
  [MaxLength(100), MinLength(1)]
  public required string Name { get; set; }
  [MaxLength(20), MinLength(1)]
  public required string TaxId { get; set; }
  public string? ContactInfo { get; set; } = null;
}

public record SupplierCreateDto : SupplierBaseDto;

public record SupplierBasicDto() : SupplierBaseDto
{
  public required int Id { get; set; }

}

public record SupplierExtendedDto : SupplierBaseDto
{
  public required int Id { get; set; }

  public required ICollection<PurchaseBasicDto> Purchase { get; set; }
}
