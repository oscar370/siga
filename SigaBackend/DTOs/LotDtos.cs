namespace SigaBackend.DTOs;

public record LotBasicDto(int Id, string LotCode, DateTimeOffset EntryDate, decimal UnitCost, decimal AvailableQuantity, int ProductId, int PurchaseId, ProductBasicDto Product);

public record LotExpandedDto(int Id, string LotCode, DateTimeOffset EntryDate, decimal UnitCost, decimal AvailableQuantity, int ProductId, int PurchaseId, ProductBasicDto Product, PurchaseBasicDto Purchase, IEnumerable<SaleTransactionDto> Transaction);