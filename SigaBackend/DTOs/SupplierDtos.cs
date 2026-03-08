using System.ComponentModel.DataAnnotations;

namespace SigaBackend.DTOs;

public record SupplierCreateDto
{
  private string _name = string.Empty;
  private string _tax_id = string.Empty;

  [MaxLength(100)]
  [MinLength(1)]
  public required string Name { get => _name; set => _name = value.Trim(); }
  [MaxLength(20)]
  [MinLength(1)]
  public required string TaxId { get => _tax_id; set => _tax_id = value.Trim(); }
  public string ContactInfo { get; set; } = string.Empty;
}

public record SupplierBasicDto(int Id, string Name, string TaxId, string ContactInfo)
{
  public int Id { get; set; } = Id;
  public string Name { get; set; } = Name;
  public string TaxId { get; set; } = TaxId;
  public string ContactInfo { get; set; } = ContactInfo;
}