using FluentValidation;
using ForumApi.Models.DTOs.Posts;

namespace ForumApi.Validators;

public class UpdatePostValidator : AbstractValidator<UpdatePostDto>
{
    public UpdatePostValidator()
    {
        RuleFor(x => x.Category)
            .MinimumLength(2).WithMessage("Category must be at least 2 characters")
            .MaximumLength(50).WithMessage("Category must not exceed 50 characters")
            .When(x => !string.IsNullOrEmpty(x.Category));

        RuleFor(x => x.Title)
            .MinimumLength(5).WithMessage("Title must be at least 5 characters")
            .MaximumLength(100).WithMessage("Title must not exceed 100 characters")
            .When(x => !string.IsNullOrEmpty(x.Title));

        RuleFor(x => x.Content)
            .MinimumLength(10).WithMessage("Content must be at least 10 characters")
            .MaximumLength(5000).WithMessage("Content must not exceed 5000 characters")
            .When(x => !string.IsNullOrEmpty(x.Content));
    }
}
