using System.Text.Json.Serialization;

namespace ForumApi.Models.DTOs.Auth;

public class AuthResponseDto
{
    [JsonPropertyName("_id")]
    public string Id { get; set; } = null!;

    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;

    [JsonPropertyName("profilePicture")]
    public string? ProfilePicture { get; set; }

    [JsonPropertyName("accessToken")]
    public string AccessToken { get; set; } = null!;

    [JsonPropertyName("_createdOn")]
    public long CreatedOn { get; set; }
}
