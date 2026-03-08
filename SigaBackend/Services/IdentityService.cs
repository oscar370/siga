using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SigaBackend.Data;
using SigaBackend.Models;

namespace SigaBackend.Services;

public class IdentityService
{
  public static async Task<Results<Ok<UserResponseDto>, NotFound>> GetUser(int id, SigaDbContext db)
  {
    var user = await db.Users
      .Include(u => u.UserRoles)
      .ThenInclude(ur => ur.Role)
      .Where(u => u.UserId == id)
      .Select(u => new UserResponseDto
      {
        Email = u.Email,
        FullName = u.FullName,
        Roles = u.UserRoles.Select(ur => ur.Role.Name).ToList()
      })
      .FirstOrDefaultAsync();

    if (user == null) return TypedResults.NotFound();

    return TypedResults.Ok(user);
  }
}