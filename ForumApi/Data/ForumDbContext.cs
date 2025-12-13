using Microsoft.EntityFrameworkCore;
using ForumApi.Models.Entities;

namespace ForumApi.Data;

public class ForumDbContext : DbContext
{
    public ForumDbContext(DbContextOptions<ForumDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.Email).HasColumnName("email").HasMaxLength(255).IsRequired();
            entity.Property(e => e.HashedPassword).HasColumnName("hashed_password").IsRequired();
            entity.Property(e => e.ProfilePicture).HasColumnName("profile_picture").HasMaxLength(500);
            entity.Property(e => e.CreatedOn).HasColumnName("created_on").IsRequired();

            entity.HasIndex(e => e.Email).IsUnique();
        });

        // Post configuration
        modelBuilder.Entity<Post>(entity =>
        {
            entity.ToTable("posts");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.OwnerId).HasColumnName("owner_id").IsRequired();
            entity.Property(e => e.Category).HasColumnName("category").HasMaxLength(50).IsRequired();
            entity.Property(e => e.Title).HasColumnName("title").HasMaxLength(100).IsRequired();
            entity.Property(e => e.Content).HasColumnName("content").IsRequired();
            entity.Property(e => e.CreatedOn).HasColumnName("created_on").IsRequired();
            entity.Property(e => e.UpdatedOn).HasColumnName("updated_on");

            entity.HasOne(e => e.Owner)
                .WithMany(u => u.Posts)
                .HasForeignKey(e => e.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(e => e.OwnerId);
            entity.HasIndex(e => e.Category);
            entity.HasIndex(e => e.CreatedOn);
        });

        // Comment configuration
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.ToTable("comments");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.PostId).HasColumnName("post_id").IsRequired();
            entity.Property(e => e.OwnerId).HasColumnName("owner_id").IsRequired();
            entity.Property(e => e.Content).HasColumnName("content").IsRequired();
            entity.Property(e => e.CreatedOn).HasColumnName("created_on").IsRequired();

            entity.HasOne(e => e.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(e => e.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Owner)
                .WithMany(u => u.Comments)
                .HasForeignKey(e => e.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(e => e.PostId);
            entity.HasIndex(e => e.OwnerId);
            entity.HasIndex(e => e.CreatedOn);
        });
    }
}
