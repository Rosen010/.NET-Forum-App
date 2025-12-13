using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ForumApi.Data;
using ForumApi.Extensions;
using ForumApi.Models.DTOs.Posts;
using ForumApi.Models.Entities;

namespace ForumApi.Controllers;

[ApiController]
[Route("data/posts")]
public class PostsController : ControllerBase
{
    private readonly ForumDbContext _context;
    private readonly IMapper _mapper;

    public PostsController(ForumDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<PostDto>>> GetAllPosts([FromQuery] string? load)
    {
        IQueryable<Post> query = _context.Posts.OrderByDescending(p => p.CreatedOn);

        // Check if we need to load author data
        bool includeAuthor = !string.IsNullOrEmpty(load) && load.Contains("author=_ownerId:users");
        if (includeAuthor)
        {
            query = query.Include(p => p.Owner);
        }

        var posts = await query.ToListAsync();
        var postDtos = posts.Select(p => MapPostToDto(p, includeAuthor)).ToList();

        return Ok(postDtos);
    }

    [HttpGet("{postId}")]
    [AllowAnonymous]
    public async Task<ActionResult<PostDto>> GetPostById(Guid postId, [FromQuery] string? load)
    {
        IQueryable<Post> query = _context.Posts.Where(p => p.Id == postId);

        bool includeAuthor = !string.IsNullOrEmpty(load) && load.Contains("author=_ownerId:users");
        if (includeAuthor)
        {
            query = query.Include(p => p.Owner);
        }

        var post = await query.FirstOrDefaultAsync();

        if (post == null)
        {
            return NotFound(new { code = 404, message = "Post not found" });
        }

        var postDto = MapPostToDto(post, includeAuthor);
        return Ok(postDto);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<PostDto>> CreatePost([FromBody] CreatePostDto request)
    {
        var userId = User.GetUserId();

        var post = _mapper.Map<Post>(request);
        post.Id = Guid.NewGuid();
        post.OwnerId = userId;
        post.CreatedOn = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        var postDto = MapPostToDto(post, false);
        return StatusCode(201, postDto);
    }

    [HttpPatch("{postId}")]
    [Authorize]
    public async Task<ActionResult<PostDto>> UpdatePost(Guid postId, [FromBody] UpdatePostDto request)
    {
        var userId = User.GetUserId();

        var post = await _context.Posts.FindAsync(postId);

        if (post == null)
        {
            return NotFound(new { code = 404, message = "Post not found" });
        }

        if (post.OwnerId != userId)
        {
            return StatusCode(403, new { code = 403, message = "You are not authorized to update this post" });
        }

        // Update only non-null values
        if (!string.IsNullOrEmpty(request.Category))
            post.Category = request.Category;
        if (!string.IsNullOrEmpty(request.Title))
            post.Title = request.Title;
        if (!string.IsNullOrEmpty(request.Content))
            post.Content = request.Content;

        post.UpdatedOn = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        await _context.SaveChangesAsync();

        var postDto = MapPostToDto(post, false);
        return Ok(postDto);
    }

    [HttpDelete("{postId}")]
    [Authorize]
    public async Task<ActionResult<PostDto>> DeletePost(Guid postId)
    {
        var userId = User.GetUserId();

        var post = await _context.Posts.FindAsync(postId);

        if (post == null)
        {
            return NotFound(new { code = 404, message = "Post not found" });
        }

        if (post.OwnerId != userId)
        {
            return StatusCode(403, new { code = 403, message = "You are not authorized to delete this post" });
        }

        var postDto = MapPostToDto(post, false);

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();

        return Ok(postDto);
    }

    private PostDto MapPostToDto(Post post, bool includeAuthor)
    {
        var dto = new PostDto
        {
            Id = post.Id.ToString(),
            OwnerId = post.OwnerId.ToString(),
            Category = post.Category,
            Title = post.Title,
            Content = post.Content,
            CreatedOn = post.CreatedOn,
            UpdatedOn = post.UpdatedOn
        };

        if (includeAuthor && post.Owner != null)
        {
            dto.Author = new Models.DTOs.Auth.UserDto
            {
                Id = post.Owner.Id.ToString(),
                Email = post.Owner.Email,
                ProfilePicture = post.Owner.ProfilePicture
            };
        }

        return dto;
    }
}
