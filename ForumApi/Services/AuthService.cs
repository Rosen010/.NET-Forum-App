using Microsoft.EntityFrameworkCore;
using ForumApi.Data;
using ForumApi.Models.DTOs.Auth;
using ForumApi.Models.Entities;

namespace ForumApi.Services;

public class AuthService : IAuthService
{
    private readonly ForumDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthService(ForumDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<AuthResponseDto?> RegisterAsync(RegisterRequestDto request)
    {
        if (await EmailExistsAsync(request.Email))
            return null;

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email.ToLowerInvariant(),
            HashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password, 12),
            ProfilePicture = request.ProfilePicture,
            CreatedOn = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var token = _tokenService.GenerateToken(user);

        return new AuthResponseDto
        {
            Id = user.Id.ToString(),
            Email = user.Email,
            ProfilePicture = user.ProfilePicture,
            AccessToken = token,
            CreatedOn = user.CreatedOn
        };
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginRequestDto request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email.ToLowerInvariant());

        if (user == null)
            return null;

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.HashedPassword))
            return null;

        var token = _tokenService.GenerateToken(user);

        return new AuthResponseDto
        {
            Id = user.Id.ToString(),
            Email = user.Email,
            ProfilePicture = user.ProfilePicture,
            AccessToken = token,
            CreatedOn = user.CreatedOn
        };
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _context.Users.AnyAsync(u => u.Email == email.ToLowerInvariant());
    }
}
