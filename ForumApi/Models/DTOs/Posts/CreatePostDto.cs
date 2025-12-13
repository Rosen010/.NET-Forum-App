namespace ForumApi.Models.DTOs.Posts;

public class CreatePostDto
{
    public string Category { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
}
