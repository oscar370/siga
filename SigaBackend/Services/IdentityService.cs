using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using SigaBackend.DTOs;
using SigaBackend.Models;

namespace SigaBackend.Services;

interface IIdentityService
{
  Task<Results<Ok<UserDto>, NotFound, UnauthorizedHttpResult>> GetUserAsync(ClaimsPrincipal claims, UserManager<User> userManager);
}

public class IdentityService() : IIdentityService
{
  public async Task<Results<Ok<UserDto>, NotFound, UnauthorizedHttpResult>> GetUserAsync(ClaimsPrincipal claims, UserManager<User> userManager)
  {
    var userId = claims.FindFirstValue(ClaimTypes.NameIdentifier);
    if (userId == null) return TypedResults.Unauthorized();

    var user = await userManager.FindByIdAsync(userId);
    if (user == null) return TypedResults.NotFound();

    var roles = await userManager.GetRolesAsync(user);

    return TypedResults.Ok(new UserDto(
      user.Id,
      user.Email,
      user.FullName,
      roles
    ));
  }
}