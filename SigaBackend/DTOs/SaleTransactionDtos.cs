using System.ComponentModel.DataAnnotations;

namespace SigaBackend.DTOs;

public record SaleTransactionBasicDto
{
    public required int Id { get; set; }

    [Range(0.0001, (double)decimal.MaxValue)]
    public required decimal QuantitySold { get; set; }

    [Range(0.01, (double)decimal.MaxValue)]
    public required decimal UnitCostApplied { get; set; }

    public required int LotId { get; set; }

    public required int SaleDetailsId { get; set; }

    public required decimal TotalCost { get; set; }
}