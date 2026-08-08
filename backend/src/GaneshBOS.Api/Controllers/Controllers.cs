using GaneshBOS.Application.DTOs;
using GaneshBOS.Application.Interfaces;
using GaneshBOS.Domain.Entities;
using GaneshBOS.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GaneshBOS.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly IJwtTokenGenerator _jwtGenerator;
    private readonly IEmailService _emailService;

    public AuthController(IApplicationDbContext context, IJwtTokenGenerator jwtGenerator, IEmailService emailService)
    {
        _context = context;
        _jwtGenerator = jwtGenerator;
        _emailService = emailService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null)
        {
            // Seed mock admin if DB is fresh
            user = new User
            {
                Email = request.Email,
                FirstName = "Ganesh",
                LastName = "Admin",
                Role = UserRole.SuperAdmin,
                Phone = "+91 9876543210"
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        var accessToken = _jwtGenerator.GenerateAccessToken(user);
        var refreshToken = _jwtGenerator.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        user.LastLoginAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        var userDto = new UserDto(user.Id, user.FirstName, user.LastName, user.Email, user.Phone, user.Role, user.AvatarUrl);
        return Ok(new AuthResponseDto(accessToken, refreshToken, userDto));
    }

    public record LoginRequest(string Email, string Password);
}

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public DashboardController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = new DashboardStatsDto(
            TotalRevenue: 4850000.00m,
            MonthlySales: 1250000.00m,
            ActiveLeadsCount: 42,
            ActiveProjectsCount: 18,
            PendingInvoicesCount: 7,
            ConversionRate: 34.8m,
            RevenueChart: new List<MonthlyRevenueDto>
            {
                new("Jan", 650000, 210000),
                new("Feb", 780000, 240000),
                new("Mar", 920000, 310000),
                new("Apr", 890000, 290000),
                new("May", 1150000, 380000),
                new("Jun", 1250000, 410000)
            },
            LeadPipelineChart: new List<LeadStatusCountDto>
            {
                new("New", 12),
                new("Contacted", 15),
                new("Qualified", 8),
                new("Proposal Sent", 5),
                new("Won", 14)
            },
            RecentActivities: new List<RecentActivityDto>
            {
                new("New Enterprise Lead Received", "5 mins ago", "CRM", "AI Automation"),
                new("Proposal Approved: FinTech Portal", "22 mins ago", "Sales", "Rahul Sharma"),
                new("Invoice #INV-2026-089 Paid", "1 hour ago", "Finance", "Razorpay Webhook"),
                new("Sprint Milestone Achieved", "3 hours ago", "Projects", "Engineering Team")
            }
        );

        return Ok(stats);
    }
}

[ApiController]
[Route("api/[controller]")]
public class LeadsController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly IOpenAiService _openAiService;
    private readonly IWhatsAppService _whatsAppService;
    private readonly IEmailService _emailService;

    public LeadsController(IApplicationDbContext context, IOpenAiService openAiService, IWhatsAppService whatsAppService, IEmailService emailService)
    {
        _context = context;
        _openAiService = openAiService;
        _whatsAppService = whatsAppService;
        _emailService = emailService;
    }

    [HttpGet]
    public async Task<IActionResult> GetLeads()
    {
        var leads = await _context.Leads
            .Select(l => new LeadDto(
                l.Id, l.Title, l.ContactName, l.Email, l.Phone, l.ServiceRequested, l.EstimatedBudget,
                l.Status, l.Priority, l.AiScore, l.SummaryNotes, l.CreatedAt))
            .ToListAsync();
        return Ok(leads);
    }

    [HttpPost]
    public async Task<IActionResult> CreateLead([FromBody] CreateLeadDto dto)
    {
        // 1. Save Lead
        var lead = new Lead
        {
            Title = dto.Title,
            ContactName = dto.ContactName,
            Email = dto.Email,
            Phone = dto.Phone,
            ServiceRequested = dto.ServiceRequested,
            EstimatedBudget = dto.EstimatedBudget,
            SummaryNotes = dto.Notes
        };

        // 2. AI Score
        lead.AiScore = await _openAiService.ScoreLeadQualityAsync(dto.Title, dto.ServiceRequested, dto.EstimatedBudget);
        lead.Priority = lead.AiScore >= 80 ? LeadPriority.High : LeadPriority.Medium;

        _context.Leads.Add(lead);
        await _context.SaveChangesAsync();

        // 3. Automated Email & WhatsApp Notifications
        await _emailService.SendWelcomeEmailAsync(dto.Email, dto.ContactName);
        await _whatsAppService.SendWhatsAppMessageAsync(dto.Phone, $"Hello {dto.ContactName}, thank you for contacting Ganesh NexGen Solutions! Our technical team is reviewing your requirement.");

        return Ok(new LeadDto(lead.Id, lead.Title, lead.ContactName, lead.Email, lead.Phone, lead.ServiceRequested, lead.EstimatedBudget, lead.Status, lead.Priority, lead.AiScore, lead.SummaryNotes, lead.CreatedAt));
    }
}

[ApiController]
[Route("api/[controller]")]
public class AiController : ControllerBase
{
    private readonly IOpenAiService _openAi;

    public AiController(IOpenAiService openAi)
    {
        _openAi = openAi;
    }

    [HttpPost("generate")]
    public async Task<IActionResult> GenerateText([FromBody] AiRequestDto dto)
    {
        string result = dto.ContextType switch
        {
            "Proposal" => await _openAi.GenerateProposalContentAsync("Enterprise Client", dto.Prompt, 500000),
            "Email" => await _openAi.GenerateEmailTemplateAsync(dto.Prompt, "Valued Client"),
            "Meeting" => await _openAi.SummarizeMeetingNotesAsync(dto.Prompt),
            _ => await _openAi.AnswerBusinessQueryAsync(dto.Prompt)
        };

        return Ok(new AiResponseDto(result, DateTime.UtcNow));
    }
}

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ProjectsController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        var mockProjects = new List<ProjectDto>
        {
            new(Guid.NewGuid(), "NexGen Cloud ERP Engine", "Building ASP.NET Core 9 Clean Architecture API & Next.js 16 Frontend", "Ganesh Corp", ProjectStatus.InDevelopment, DateTime.UtcNow.AddDays(-15), DateTime.UtcNow.AddDays(45), 850000, 14, 18, 77.7),
            new(Guid.NewGuid(), "AI Customer Portal", "OpenAI LLM Integration for automatic ticket resolution", "FinTech Inc", ProjectStatus.InReview, DateTime.UtcNow.AddDays(-30), DateTime.UtcNow.AddDays(10), 450000, 12, 12, 100.0),
            new(Guid.NewGuid(), "Mobile Banking iOS & Android", "React Native app with Razorpay Payment Gateway", "Global Bank", ProjectStatus.Planning, DateTime.UtcNow, DateTime.UtcNow.AddDays(90), 1200000, 2, 20, 10.0)
        };
        return Ok(mockProjects);
    }
}
