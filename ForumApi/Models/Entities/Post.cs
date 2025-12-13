namespace ForumApi.Models.Entities;

public class Post
{
    public Guid Id { get; set; }
    public Guid OwnerId { get; set; }
    public string Category { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public long CreatedOn { get; set; }
    public long? UpdatedOn { get; set; }

    // Navigation properties
    public User Owner { get; set; } = null!;
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}
