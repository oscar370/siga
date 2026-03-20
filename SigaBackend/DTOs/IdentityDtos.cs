namespace SigaBackend.DTOs;

public record UserBasicDto(int Id, string? Email, string FullName);

public record UserDto(int Id, string? Email, string FullName, IList<string> Roles);