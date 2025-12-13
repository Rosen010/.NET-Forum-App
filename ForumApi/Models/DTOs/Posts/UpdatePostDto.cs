namespace ForumApi.Models.DTOs.Posts;

public class UpdatePostDto
{
    public string? Category { get; set; }
    public string? Title { get; set; }
    public string? Content { get; set; }
}
