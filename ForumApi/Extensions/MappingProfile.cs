using AutoMapper;
using ForumApi.Models.DTOs.Auth;
using ForumApi.Models.DTOs.Comments;
using ForumApi.Models.DTOs.Posts;
using ForumApi.Models.Entities;

namespace ForumApi.Extensions;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User mappings
        CreateMap<User, AuthResponseDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
            .ForMember(dest => dest.AccessToken, opt => opt.Ignore());

        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()));

        CreateMap<User, CommentAuthorDto>();

        // Post mappings
        CreateMap<Post, PostDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
            .ForMember(dest => dest.OwnerId, opt => opt.MapFrom(src => src.OwnerId.ToString()))
            .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Owner));

        CreateMap<CreatePostDto, Post>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.OwnerId, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedOn, opt => opt.Ignore())
            .ForMember(dest => dest.Owner, opt => opt.Ignore())
            .ForMember(dest => dest.Comments, opt => opt.Ignore());

        // Comment mappings
        CreateMap<Comment, CommentDto>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
            .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.PostId.ToString()))
            .ForMember(dest => dest.OwnerId, opt => opt.MapFrom(src => src.OwnerId.ToString()))
            .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Owner));

        CreateMap<CreateCommentDto, Comment>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => Guid.Parse(src.PostId)))
            .ForMember(dest => dest.OwnerId, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
            .ForMember(dest => dest.Owner, opt => opt.Ignore())
            .ForMember(dest => dest.Post, opt => opt.Ignore());
    }
}
