using System.Text.RegularExpressions;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ForumApi.Data;
using ForumApi.Extensions;
using ForumApi.Models.DTOs.Comments;
using ForumApi.Models.Entities;

namespace ForumApi.Controllers;

[ApiController]
[Route("jsonstore/comments")]
public class CommentsController : ControllerBase
{
    private readonly ForumDbContext _context;
    private readonly IMapper _mapper;

    public CommentsController(ForumDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<CommentDto>>> GetComments(
        [FromQuery] string? where,
        [FromQuery] string? sortBy)
    {
        IQueryable<Comment> query = _context.Comments.Include(c => c.Owner);

        // Parse where clause: postId="{uuid}"
        var postId = ParseWhereClause(where);
        if (postId.HasValue)
        {
            query = query.Where(c => c.PostId == postId.Value);
        }

        // Parse sortBy: "_createdOn desc"
        if (!string.IsNullOrEmpty(sortBy) && sortBy.Contains("_createdOn"))
        {
            if (sortBy.Contains("desc"))
            {
                query = query.OrderByDescending(c => c.CreatedOn);
            }
            else
            {
                query = query.OrderBy(c => c.CreatedOn);
            }
        }
        else
        {
            // Default: order by creation date descending
            query = query.OrderByDescending(c => c.CreatedOn);
        }

        var comments = await query.ToListAsync();
        var commentDtos = comments.Select(MapCommentToDto).ToList();

        return Ok(commentDtos);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<CommentDto>> CreateComment([FromBody] CreateCommentDto request)
    {
        var userId = User.GetUserId();

        if (!Guid.TryParse(request.PostId, out var postId))
        {
            return BadRequest(new { code = 400, message = "Invalid post ID format" });
        }

        // Validate post exists
        var postExists = await _context.Posts.AnyAsync(p => p.Id == postId);
        if (!postExists)
        {
            return NotFound(new { code = 404, message = "Post not found" });
        }

        var comment = new Comment
        {
            Id = Guid.NewGuid(),
            PostId = postId,
            OwnerId = userId,
            Content = request.Content,
            CreatedOn = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
        };

        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        // Load the owner for the response
        await _context.Entry(comment).Reference(c => c.Owner).LoadAsync();

        var commentDto = MapCommentToDto(comment);
        return StatusCode(201, commentDto);
    }

    [HttpDelete("{commentId}")]
    [Authorize]
    public async Task<ActionResult<CommentDto>> DeleteComment(Guid commentId)
    {
        var userId = User.GetUserId();

        var comment = await _context.Comments
            .Include(c => c.Owner)
            .FirstOrDefaultAsync(c => c.Id == commentId);

        if (comment == null)
        {
            return NotFound(new { code = 404, message = "Comment not found" });
        }

        if (comment.OwnerId != userId)
        {
            return StatusCode(403, new { code = 403, message = "You are not authorized to delete this comment" });
        }

        var commentDto = MapCommentToDto(comment);

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();

        return Ok(commentDto);
    }

    private static Guid? ParseWhereClause(string? where)
    {
        if (string.IsNullOrEmpty(where)) return null;

        // Match patterns like: postId="{uuid}" or postId=\"{uuid}\"
        var match = Regex.Match(where, @"postId[=\\""]+([a-fA-F0-9\-]+)");
        if (match.Success && Guid.TryParse(match.Groups[1].Value, out var postId))
            return postId;

        return null;
    }

    private static CommentDto MapCommentToDto(Comment comment)
    {
        return new CommentDto
        {
            Id = comment.Id.ToString(),
            PostId = comment.PostId.ToString(),
            OwnerId = comment.OwnerId.ToString(),
            Content = comment.Content,
            CreatedOn = comment.CreatedOn,
            Author = new CommentAuthorDto
            {
                Email = comment.Owner?.Email ?? "",
                ProfilePicture = comment.Owner?.ProfilePicture
            }
        };
    }
}
