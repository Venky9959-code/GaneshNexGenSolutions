using GaneshBOS.Domain.Enums;

namespace GaneshBOS.Application.DTOs;

public record AuthResponseDto(
    string AccessToken,
    string RefreshToken,
    UserDto User
);

public record UserDto(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    UserRole Role,
    string? AvatarUrl
);

public record DashboardStatsDto(
    decimal TotalRevenue,
    decimal MonthlySales,
    int ActiveLeadsCount,
    int ActiveProjectsCount,
    int PendingInvoicesCount,
    decimal ConversionRate,
    List<MonthlyRevenueDto> RevenueChart,
    List<LeadStatusCountDto> LeadPipelineChart,
    List<RecentActivityDto> RecentActivities
);

public record MonthlyRevenueDto(string Month, decimal Revenue, decimal Expenses);
public record LeadStatusCountDto(string Status, int Count);
public record RecentActivityDto(string Title, string Timestamp, string Category, string User);

public record LeadDto(
    Guid Id,
    string Title,
    string ContactName,
    string Email,
    string Phone,
    string ServiceRequested,
    decimal EstimatedBudget,
    LeadStatus Status,
    LeadPriority Priority,
    double AiScore,
    string? SummaryNotes,
    DateTime CreatedAt
);

public record CreateLeadDto(
    string Title,
    string ContactName,
    string Email,
    string Phone,
    string ServiceRequested,
    decimal EstimatedBudget,
    string? Notes
);

public record ProposalDto(
    Guid Id,
    string ProposalNumber,
    string Title,
    string ContactName,
    string Email,
    decimal SubTotal,
    decimal TaxAmount,
    decimal TotalAmount,
    ProposalStatus Status,
    DateTime ValidUntil,
    string ContentMarkdown,
    List<ProposalItemDto> Items
);

public record ProposalItemDto(string Description, int Quantity, decimal UnitPrice, decimal TotalPrice);

public record InvoiceDto(
    Guid Id,
    string InvoiceNumber,
    string ClientName,
    string ClientEmail,
    DateTime IssueDate,
    DateTime DueDate,
    decimal SubTotal,
    decimal GstAmount,
    decimal TotalAmount,
    decimal AmountPaid,
    InvoiceStatus Status,
    List<InvoiceItemDto> Items
);

public record InvoiceItemDto(string ItemName, int Quantity, decimal UnitPrice, decimal Amount);

public record ProjectDto(
    Guid Id,
    string Name,
    string Description,
    string ClientName,
    ProjectStatus Status,
    DateTime StartDate,
    DateTime TargetEndDate,
    decimal Budget,
    int CompletedTasksCount,
    int TotalTasksCount,
    double ProgressPercentage
);

public record ProjectTaskDto(
    Guid Id,
    Guid ProjectId,
    string Title,
    string? Description,
    TaskStatus Status,
    LeadPriority Priority,
    string? AssignedToUser,
    DateTime? DueDate,
    double EstimatedHours,
    double LoggedHours
);

public record EmployeeDto(
    Guid Id,
    string EmployeeCode,
    string FullName,
    string Email,
    string Department,
    string Designation,
    DateTime JoiningDate,
    decimal MonthlySalary
);

public record ExpenseDto(
    Guid Id,
    string Category,
    string Description,
    decimal Amount,
    DateTime ExpenseDate,
    string PaymentMethod
);

public record AiRequestDto(
    string Prompt,
    string ContextType // "Proposal", "Email", "Blog", "Meeting", "General"
);

public record AiResponseDto(
    string GeneratedText,
    DateTime Timestamp
);
