using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ForumApi.Models.DTOs.Auth;
using ForumApi.Services;

namespace ForumApi.Controllers;

[ApiController]
[Route("users")]
public class UsersController : ControllerBase
{
    private readonly IAuthService _authService;

    public UsersController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterRequestDto request)
    {
        if (await _authService.EmailExistsAsync(request.Email))
        {
            return BadRequest(new { code = 400, message = "Email already exists" });
        }

        var result = await _authService.RegisterAsync(request);

        if (result == null)
        {
            return BadRequest(new { code = 400, message = "Registration failed" });
        }

        return StatusCode(201, result);
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginRequestDto request)
    {
        var result = await _authService.LoginAsync(request);

        if (result == null)
        {
            return Unauthorized(new { code = 401, message = "Invalid email or password" });
        }

        return Ok(result);
    }

    [HttpGet("logout")]
    [Authorize]
    public IActionResult Logout()
    {
        return NoContent();
    }
}
