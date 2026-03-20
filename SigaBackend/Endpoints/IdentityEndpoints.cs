using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using SigaBackend.Models;
using SigaBackend.Services;

namespace SigaBackend.Endpoints;

public static class IdentityEndpoints
{
  public static void MapIdentityEndpoints(this IEndpointRouteBuilder builder)
  {
    var group = builder.MapGroup("/api/auth");

    group.MapGet("/me", (ClaimsPrincipal claims, UserManager<User> userManager, IIdentityService service) => service.GetUserAsync(claims, userManager)).WithName("GetUser").RequireAuthorization();
  }
}