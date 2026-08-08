using GaneshBOS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GaneshBOS.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<Company> Companies { get; }
    DbSet<Contact> Contacts { get; }
    DbSet<Lead> Leads { get; }
    DbSet<LeadActivity> LeadActivities { get; }
    DbSet<Proposal> Proposals { get; }
    DbSet<ProposalItem> ProposalItems { get; }
    DbSet<Invoice> Invoices { get; }
    DbSet<InvoiceItem> InvoiceItems { get; }
    DbSet<Payment> Payments { get; }
    DbSet<Project> Projects { get; }
    DbSet<Milestone> Milestones { get; }
    DbSet<ProjectTask> ProjectTasks { get; }
    DbSet<TimeLog> TimeLogs { get; }
    DbSet<Employee> Employees { get; }
    DbSet<Attendance> Attendances { get; }
    DbSet<LeaveRequest> LeaveRequests { get; }
    DbSet<Expense> Expenses { get; }
    DbSet<CmsItem> CmsItems { get; }
    DbSet<WhatsAppMessageLog> WhatsAppMessageLogs { get; }
    DbSet<AuditLog> AuditLogs { get; }
    DbSet<SystemSetting> SystemSettings { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

public interface IJwtTokenGenerator
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
}

public interface IOpenAiService
{
    Task<string> GenerateProposalContentAsync(string clientName, string serviceType, decimal budget);
    Task<double> ScoreLeadQualityAsync(string title, string service, decimal budget);
    Task<string> GenerateEmailTemplateAsync(string purpose, string recipientName);
    Task<string> AnswerBusinessQueryAsync(string userPrompt);
    Task<string> SummarizeMeetingNotesAsync(string rawNotes);
}

public interface IWhatsAppService
{
    Task<bool> SendWhatsAppMessageAsync(string phone, string message);
    Task<bool> SendProposalNotificationAsync(string phone, string clientName, string proposalUrl);
}

public interface IEmailService
{
    Task<bool> SendEmailAsync(string recipientEmail, string subject, string htmlBody);
    Task<bool> SendWelcomeEmailAsync(string recipientEmail, string recipientName);
}

public interface IPdfGenerator
{
    byte[] GenerateProposalPdf(Proposal proposal);
    byte[] GenerateInvoicePdf(Invoice invoice);
}

public interface IRazorpayService
{
    Task<string> CreatePaymentOrderAsync(decimal amount, string currency = "INR");
    bool VerifyPaymentSignature(string orderId, string paymentId, string signature);
}
