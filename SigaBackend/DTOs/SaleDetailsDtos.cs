using System.ComponentModel.DataAnnotations;

namespace SigaBackend.DTOs;

public abstract record SaleDetailsBaseDto
{
    public int Id { get; set; }

    [Range(0.0001, (double)decimal.MaxValue)]
    public required decimal QuantityRequested { get; set; }

    [Range(0.01, (double)decimal.MaxValue)]
    public required decimal UnitSellingPrice { get; set; }

    public required int ProductId { get; set; }

    public required ProductBasicDto Product { get; set; }

    public decimal Subtotal => QuantityRequested * UnitSellingPrice;
}

public record SaleDetailsBasicDto : SaleDetailsBaseDto;

public record SaleDetailsExtendedDto : SaleDetailsBaseDto
{

    public required int SaleId { get; set; }
    public SaleBasicDto Sale { get; set; } = null!;

    public ICollection<SaleTransactionBasicDto> Transactions { get; set; } = [];
}