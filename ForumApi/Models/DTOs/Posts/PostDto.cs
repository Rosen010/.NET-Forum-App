using System.Text.Json.Serialization;
using ForumApi.Models.DTOs.Auth;

namespace ForumApi.Models.DTOs.Posts;

public class PostDto
{
    [JsonPropertyName("_id")]
    public string Id { get; set; } = null!;

    [JsonPropertyName("_ownerId")]
    public string OwnerId { get; set; } = null!;

    [JsonPropertyName("category")]
    public string Category { get; set; } = null!;

    [JsonPropertyName("title")]
    public string Title { get; set; } = null!;

    [JsonPropertyName("content")]
    public string Content { get; set; } = null!;

    [JsonPropertyName("_createdOn")]
    public long CreatedOn { get; set; }

    [JsonPropertyName("_updatedOn")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public long? UpdatedOn { get; set; }

    [JsonPropertyName("author")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public UserDto? Author { get; set; }
}
