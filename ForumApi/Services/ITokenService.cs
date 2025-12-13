using ForumApi.Models.Entities;

namespace ForumApi.Services;

public interface ITokenService
{
    string GenerateToken(User user);
    Guid? ValidateToken(string token);
}
