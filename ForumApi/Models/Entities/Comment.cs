namespace ForumApi.Models.Entities;

public class Comment
{
    public Guid Id { get; set; }
    public Guid PostId { get; set; }
    public Guid OwnerId { get; set; }
    public string Content { get; set; } = null!;
    public long CreatedOn { get; set; }

    // Navigation properties
    public Post Post { get; set; } = null!;
    public User Owner { get; set; } = null!;
}
