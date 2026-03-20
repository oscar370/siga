namespace SigaBackend.DTOs;

public record SaleTransactionDto(decimal QuantitySold, decimal UnitCostApplied, int SaleDetailsId, int LotId);