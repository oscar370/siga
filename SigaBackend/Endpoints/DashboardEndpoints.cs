using Microsoft.AspNetCore.Authorization;
using SigaBackend.DTOs;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class DashboardEndpoints
{
  public static void MapDashboardEndpoints(this IEndpointRouteBuilder router)
  {
    var group = router.MapGroup("/api/dashboard");

    group.MapGet("/summary", ([AsParameters] FinancialSummaryParamsDto financialParams, IDashboardService service) => service.GetFinancialSummaryAsync(financialParams)).WithName("GetFinancialSummary").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });

    group.MapGet("/recent-transactions", (IDashboardService service, int limit = 10) => service.GetRecentTransactionsAsync(limit)).WithName("GetRecentTransactions").RequireAuthorization(new AuthorizeAttribute { Roles = "Admin,Auditor" });
  }
}