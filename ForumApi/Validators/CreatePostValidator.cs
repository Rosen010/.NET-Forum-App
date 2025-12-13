using FluentValidation;
using ForumApi.Models.DTOs.Posts;

namespace ForumApi.Validators;

public class CreatePostValidator : AbstractValidator<CreatePostDto>
{
    public CreatePostValidator()
    {
        RuleFor(x => x.Category)
            .NotEmpty().WithMessage("Category is required")
            .MinimumLength(2).WithMessage("Category must be at least 2 characters")
            .MaximumLength(50).WithMessage("Category must not exceed 50 characters");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MinimumLength(5).WithMessage("Title must be at least 5 characters")
            .MaximumLength(100).WithMessage("Title must not exceed 100 characters");

        RuleFor(x => x.Content)
            .NotEmpty().WithMessage("Content is required")
            .MinimumLength(10).WithMessage("Content must be at least 10 characters")
            .MaximumLength(5000).WithMessage("Content must not exceed 5000 characters");
    }
}
