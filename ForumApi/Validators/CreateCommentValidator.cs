using FluentValidation;
using ForumApi.Models.DTOs.Comments;

namespace ForumApi.Validators;

public class CreateCommentValidator : AbstractValidator<CreateCommentDto>
{
    public CreateCommentValidator()
    {
        RuleFor(x => x.PostId)
            .NotEmpty().WithMessage("Post ID is required")
            .Must(BeAValidGuid).WithMessage("Post ID must be a valid UUID");

        RuleFor(x => x.Content)
            .NotEmpty().WithMessage("Content is required")
            .MaximumLength(5000).WithMessage("Content must not exceed 5000 characters");
    }

    private bool BeAValidGuid(string postId)
    {
        return Guid.TryParse(postId, out _);
    }
}
