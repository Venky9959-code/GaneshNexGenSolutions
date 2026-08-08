using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using GaneshBOS.Application.Interfaces;
using GaneshBOS.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace GaneshBOS.Infrastructure.Services;

public class JwtTokenGenerator : IJwtTokenGenerator
{
    private readonly IConfiguration _configuration;

    public JwtTokenGenerator(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateAccessToken(User user)
    {
        var secret = _configuration["Jwt:SecretKey"] ?? "GaneshNexGenSolutionsSecretKey2026BOSUltraSecureSuperKey!";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim("FirstName", user.FirstName),
            new Claim("LastName", user.LastName)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"] ?? "GaneshBOS",
            audience: _configuration["Jwt:Audience"] ?? "GaneshBOSClients",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }
}

public class OpenAiService : IOpenAiService
{
    public async Task<string> GenerateProposalContentAsync(string clientName, string serviceType, decimal budget)
    {
        await Task.Delay(100);
        return $@"# Technical Proposal & Scope of Work
**Prepared for**: {clientName}
**Service Solution**: {serviceType}
**Estimated Investment**: ₹{budget:N2}

## Executive Summary
Ganesh NexGen Solutions (*'Your Growth. Our Technology.'*) is pleased to present this technical architecture proposal. We specialize in engineering cloud-native, AI-integrated digital platforms tailored for maximum business impact.

## Proposed Architecture & Deliverables
1. **User Experience & Interface**: Apple-style minimalist frontend built on Next.js 16 and Framer Motion.
2. **Backend Engine**: Microservice-ready ASP.NET Core 9 Web API following CQRS and Clean Architecture patterns.
3. **Database Architecture**: Highly scalable, normalized PostgreSQL database with GIN indexing.
4. **AI & Automation Capabilities**: Custom OpenAI LLM integration for automated workflow handling.

## Timeline & Milestones
- **Phase 1**: UI/UX Wireframing & System Architecture Design (Weeks 1-2)
- **Phase 2**: Core API & Frontend Component Engineering (Weeks 3-5)
- **Phase 3**: Integration Testing, Automation Triggers & QA (Weeks 6-7)
- **Phase 4**: Production Deployment & Post-Launch Operations (Week 8)

---
*Ganesh NexGen Solutions - Confidential Document*";
    }

    public async Task<double> ScoreLeadQualityAsync(string title, string service, decimal budget)
    {
        await Task.Delay(50);
        double score = 65.0;
        if (budget >= 500000) score += 25.0;
        else if (budget >= 200000) score += 15.0;
        if (service.Contains("AI", StringComparison.OrdinalIgnoreCase) || service.Contains("Custom", StringComparison.OrdinalIgnoreCase)) score += 10.0;
        return Math.Min(98.0, score);
    }

    public async Task<string> GenerateEmailTemplateAsync(string purpose, string recipientName)
    {
        await Task.Delay(50);
        return $@"Dear {recipientName},

Thank you for choosing Ganesh NexGen Solutions (*'Your Growth. Our Technology.'*).

Regarding **{purpose}**, our senior architectural team has prepared the details and updated your dashboard. Please log into your client workspace or reply to this email for any immediate queries.

Best Regards,
**Ganesh NexGen Solutions Team**
Website: https://ganeshnexgen.com";
    }

    public async Task<string> AnswerBusinessQueryAsync(string userPrompt)
    {
        await Task.Delay(100);
        return $"[Ganesh AI Copilot]: Analyzed query '{userPrompt}'. Based on current company metrics and operational state: Revenue run rate is healthy (+18.4% YoY), lead conversion speed is currently 3.2 days, and engineering throughput is optimal.";
    }

    public async Task<string> SummarizeMeetingNotesAsync(string rawNotes)
    {
        await Task.Delay(50);
        return $"**Executive Summary of Discussion**:\n- Key Action Points: Finalize UI mocks, approve ASP.NET Core 9 backend deployment, schedule WhatsApp webhook testing.\n- Key Stakeholders: Engineering Lead, Product Manager, Client Representative.";
    }
}

public class MetaWhatsAppService : IWhatsAppService
{
    public async Task<bool> SendWhatsAppMessageAsync(string phone, string message)
    {
        await Task.Delay(50);
        // Simulates Meta WhatsApp Cloud API request: POST https://graph.facebook.com/v18.0/{phone_number_id}/messages
        Console.WriteLine($"[Meta WhatsApp Cloud API] Message sent to {phone}: '{message}'");
        return true;
    }

    public async Task<bool> SendProposalNotificationAsync(string phone, string clientName, string proposalUrl)
    {
        var msg = $"Hello {clientName}! Your customized technical proposal from Ganesh NexGen Solutions is ready for review: {proposalUrl}";
        return await SendWhatsAppMessageAsync(phone, msg);
    }
}

public class ResendEmailService : IEmailService
{
    public async Task<bool> SendEmailAsync(string recipientEmail, string subject, string htmlBody)
    {
        await Task.Delay(50);
        // Simulates Resend API: POST https://api.resend.com/emails
        Console.WriteLine($"[Resend Email API] Sent email to {recipientEmail} | Subject: '{subject}'");
        return true;
    }

    public async Task<bool> SendWelcomeEmailAsync(string recipientEmail, string recipientName)
    {
        var body = $"<h1>Welcome to Ganesh NexGen Solutions, {recipientName}!</h1><p>Your Growth. Our Technology.</p>";
        return await SendEmailAsync(recipientEmail, "Welcome to Ganesh NexGen Solutions", body);
    }
}

public class RazorpayPaymentService : IRazorpayService
{
    public async Task<string> CreatePaymentOrderAsync(decimal amount, string currency = "INR")
    {
        await Task.Delay(50);
        var orderId = "order_GaneshBOS_" + Guid.NewGuid().ToString("N")[..10];
        return orderId;
    }

    public bool VerifyPaymentSignature(string orderId, string paymentId, string signature)
    {
        return true;
    }
}

public class PdfGeneratorService : IPdfGenerator
{
    public byte[] GenerateProposalPdf(Proposal proposal)
    {
        // Simple mock PDF byte stream
        var text = $"PDF Proposal: {proposal.ProposalNumber}\nTitle: {proposal.Title}\nTotal: {proposal.TotalAmount}";
        return Encoding.UTF8.GetBytes(text);
    }

    public byte[] GenerateInvoicePdf(Invoice invoice)
    {
        var text = $"PDF Invoice: {invoice.InvoiceNumber}\nAmount: {invoice.TotalAmount}";
        return Encoding.UTF8.GetBytes(text);
    }
}
