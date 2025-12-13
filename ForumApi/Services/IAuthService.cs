using ForumApi.Models.DTOs.Auth;

namespace ForumApi.Services;

public interface IAuthService
{
    Task<AuthResponseDto?> RegisterAsync(RegisterRequestDto request);
    Task<AuthResponseDto?> LoginAsync(LoginRequestDto request);
    Task<bool> EmailExistsAsync(string email);
}
