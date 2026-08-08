using GaneshBOS.Domain.Common;
using GaneshBOS.Domain.Enums;

namespace GaneshBOS.Domain.Entities;

public class User : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public UserRole Role { get; set; } = UserRole.Developer;
    public bool IsActive { get; set; } = true;
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
    public DateTime? LastLoginAt { get; set; }

    // Navigation
    public ICollection<ProjectTask> AssignedTasks { get; set; } = new List<ProjectTask>();
    public ICollection<Lead> AssignedLeads { get; set; } = new List<Lead>();
}

public class Company : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Website { get; set; }
    public string? Industry { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? Gstin { get; set; }

    public ICollection<Contact> Contacts { get; set; } = new List<Contact>();
    public ICollection<Lead> Leads { get; set; } = new List<Lead>();
}

public class Contact : BaseEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Designation { get; set; }

    public Guid? CompanyId { get; set; }
    public Company? Company { get; set; }
}

public class Lead : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string ContactName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string ServiceRequested { get; set; } = string.Empty;
    public decimal EstimatedBudget { get; set; }
    public LeadStatus Status { get; set; } = LeadStatus.New;
    public LeadPriority Priority { get; set; } = LeadPriority.Medium;
    public double AiScore { get; set; } = 0.0;
    public string? SummaryNotes { get; set; }

    public Guid? AssignedToUserId { get; set; }
    public User? AssignedToUser { get; set; }

    public Guid? CompanyId { get; set; }
    public Company? Company { get; set; }

    public ICollection<LeadActivity> Activities { get; set; } = new List<LeadActivity>();
}

public class LeadActivity : BaseEntity
{
    public Guid LeadId { get; set; }
    public Lead Lead { get; set; } = null!;
    public string ActivityType { get; set; } = string.Empty; // Note, Call, Email, WhatsApp
    public string Description { get; set; } = string.Empty;
    public DateTime LoggedAt { get; set; } = DateTime.UtcNow;
}

public class Proposal : BaseEntity
{
    public string ProposalNumber { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public Guid LeadId { get; set; }
    public Lead Lead { get; set; } = null!;
    public decimal SubTotal { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public ProposalStatus Status { get; set; } = ProposalStatus.Draft;
    public DateTime ValidUntil { get; set; }
    public string ContentMarkdown { get; set; } = string.Empty;

    public ICollection<ProposalItem> Items { get; set; } = new List<ProposalItem>();
}

public class ProposalItem : BaseEntity
{
    public Guid ProposalId { get; set; }
    public string Description { get; set; } = string.Empty;
    public int Quantity { get; set; } = 1;
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice => Quantity * UnitPrice;
}

public class Invoice : BaseEntity
{
    public string InvoiceNumber { get; set; } = string.Empty;
    public Guid ClientId { get; set; }
    public User Client { get; set; } = null!;
    public Guid? ProjectId { get; set; }
    public DateTime IssueDate { get; set; } = DateTime.UtcNow;
    public DateTime DueDate { get; set; }
    public decimal SubTotal { get; set; }
    public decimal GstRatePercentage { get; set; } = 18.0m;
    public decimal GstAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal AmountPaid { get; set; }
    public InvoiceStatus Status { get; set; } = InvoiceStatus.Draft;

    public ICollection<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
    public ICollection<Payment> Payments { get; set; } = new List<Payment>();
}

public class InvoiceItem : BaseEntity
{
    public Guid InvoiceId { get; set; }
    public string ItemName { get; set; } = string.Empty;
    public int Quantity { get; set; } = 1;
    public decimal UnitPrice { get; set; }
    public decimal Amount => Quantity * UnitPrice;
}

public class Payment : BaseEntity
{
    public Guid InvoiceId { get; set; }
    public Invoice Invoice { get; set; } = null!;
    public string TransactionId { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
    public string PaymentMethod { get; set; } = "Razorpay";
    public string Status { get; set; } = "Success";
}

public class Project : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public Guid ClientId { get; set; }
    public User Client { get; set; } = null!;
    public ProjectStatus Status { get; set; } = ProjectStatus.Planning;
    public DateTime StartDate { get; set; }
    public DateTime TargetEndDate { get; set; }
    public decimal Budget { get; set; }

    public ICollection<Milestone> Milestones { get; set; } = new List<Milestone>();
    public ICollection<ProjectTask> Tasks { get; set; } = new List<ProjectTask>();
}

public class Milestone : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public string Title { get; set; } = string.Empty;
    public DateTime DueDate { get; set; }
    public bool IsCompleted { get; set; }
    public decimal MilestoneAmount { get; set; }
}

public class ProjectTask : BaseEntity
{
    public Guid ProjectId { get; set; }
    public Project Project { get; set; } = null!;
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public TaskStatus Status { get; set; } = TaskStatus.Todo;
    public LeadPriority Priority { get; set; } = LeadPriority.Medium;

    public Guid? AssignedToUserId { get; set; }
    public User? AssignedToUser { get; set; }

    public DateTime? DueDate { get; set; }
    public double EstimatedHours { get; set; }
    public double LoggedHours { get; set; }
}

public class TimeLog : BaseEntity
{
    public Guid TaskId { get; set; }
    public ProjectTask Task { get; set; } = null!;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public double Hours { get; set; }
    public string Note { get; set; } = string.Empty;
    public DateTime DateLogged { get; set; } = DateTime.UtcNow;
}

public class Employee : BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public string EmployeeCode { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;
    public DateTime JoiningDate { get; set; }
    public decimal MonthlySalary { get; set; }
    public string BankAccountDetails { get; set; } = string.Empty;
}

public class Attendance : BaseEntity
{
    public Guid EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;
    public DateTime Date { get; set; }
    public TimeSpan? ClockInTime { get; set; }
    public TimeSpan? ClockOutTime { get; set; }
    public AttendanceStatus Status { get; set; } = AttendanceStatus.Present;
}

public class LeaveRequest : BaseEntity
{
    public Guid EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;
    public LeaveType Type { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Reason { get; set; } = string.Empty;
    public LeaveStatus Status { get; set; } = LeaveStatus.Pending;
}

public class Expense : BaseEntity
{
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime ExpenseDate { get; set; } = DateTime.UtcNow;
    public string ReceiptsUrl { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = string.Empty;
}

public class CmsItem : BaseEntity
{
    public CmsContentType Type { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? FeaturedImageUrl { get; set; }
    public bool IsPublished { get; set; } = true;
    public string? SeoKeywords { get; set; }
}

public class WhatsAppMessageLog : BaseEntity
{
    public string RecipientPhone { get; set; } = string.Empty;
    public string MessageTemplate { get; set; } = string.Empty;
    public string MessageContent { get; set; } = string.Empty;
    public string Status { get; set; } = "Sent";
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
}

public class AuditLog : BaseEntity
{
    public string Action { get; set; } = string.Empty;
    public string EntityName { get; set; } = string.Empty;
    public string EntityId { get; set; } = string.Empty;
    public string ChangesJson { get; set; } = string.Empty;
    public string PerformedBy { get; set; } = string.Empty;
}

public class SystemSetting : BaseEntity
{
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string Category { get; set; } = "General";
}
