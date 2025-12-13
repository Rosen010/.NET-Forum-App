using System.Text.Json.Serialization;

namespace ForumApi.Models.DTOs.Comments;

public class CommentDto
{
    [JsonPropertyName("_id")]
    public string Id { get; set; } = null!;

    [JsonPropertyName("postId")]
    public string PostId { get; set; } = null!;

    [JsonPropertyName("_ownerId")]
    public string OwnerId { get; set; } = null!;

    [JsonPropertyName("content")]
    public string Content { get; set; } = null!;

    [JsonPropertyName("_createdOn")]
    public long CreatedOn { get; set; }

    [JsonPropertyName("author")]
    public CommentAuthorDto Author { get; set; } = null!;
}

public class CommentAuthorDto
{
    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;

    [JsonPropertyName("profilePicture")]
    public string? ProfilePicture { get; set; }
}
