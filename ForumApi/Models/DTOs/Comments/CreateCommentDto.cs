using System.Text.Json.Serialization;

namespace ForumApi.Models.DTOs.Comments;

public class CreateCommentDto
{
    [JsonPropertyName("postId")]
    public string PostId { get; set; } = null!;

    [JsonPropertyName("content")]
    public string Content { get; set; } = null!;
}
