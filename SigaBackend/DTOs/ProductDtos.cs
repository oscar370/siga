using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SigaBackend.Models;

namespace SigaBackend.DTOs;

public record ProductCreateDto
{
  private string _name = string.Empty;
  private string _sku = string.Empty;
  private string _description = string.Empty;

  [MaxLength(50)]
  [MinLength(1)]
  public required string Name { get => _name; set => _name = value.Trim(); }

  [MaxLength(50)]
  [MinLength(1)]
  public required string SKU { get => _sku; set => _sku = value.Trim(); }

  [MaxLength(200)]
  public string Description { get => _description; set => _description = value.Trim(); }

  [Range(0.01, (double)decimal.MaxValue, ErrorMessage = "The price must be greater than 0")]
  [Column(TypeName = "decimal(18,2)")]
  public required decimal BasePrice { get; set; }

  public required int CategoryId { get; set; }

  public required int UnityOfMeasureId { get; set; }

}

public record ProductBasicDto(int Id, string Name, string SKU, string Description, decimal BasePrice, int CategoryId, int UnityOfMeasureId);

public record ProductExtendedDto(int Id, string Name, string SKU, string Description, decimal BasePrice, int CategoryId, int UnityOfMeasureId, CategoryBasicDto Category, UnityOfMeasureBasicDto UnityOfMeasure);
