namespace ForumApi.Models.Entities;

public class User
{
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string HashedPassword { get; set; } = null!;
    public string? ProfilePicture { get; set; }
    public long CreatedOn { get; set; }

    // Navigation properties
    public ICollection<Post> Posts { get; set; } = new List<Post>();
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
