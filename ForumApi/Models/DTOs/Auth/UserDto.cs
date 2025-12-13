using System.Text.Json.Serialization;

namespace ForumApi.Models.DTOs.Auth;

public class UserDto
{
    [JsonPropertyName("_id")]
    public string Id { get; set; } = null!;

    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;

    [JsonPropertyName("profilePicture")]
    public string? ProfilePicture { get; set; }
}
