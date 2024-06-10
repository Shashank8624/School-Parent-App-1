using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var parent = await _context.Parents
            .FirstOrDefaultAsync(p => p.RegistrationId == request.RegistrationId && p.Password == request.Password);

        if (parent == null)
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }

        // Return a simple success message or token here if using JWT
        return Ok(new { message = "Login successful" });
    }
}

public class LoginRequest
{
    public string RegistrationId { get; set; }
    public string Password { get; set; }
}