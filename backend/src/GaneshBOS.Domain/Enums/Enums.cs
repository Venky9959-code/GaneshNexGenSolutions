namespace GaneshBOS.Domain.Enums;

public enum UserRole
{
    SuperAdmin,
    Admin,
    ProjectManager,
    Developer,
    Designer,
    SalesExecutive,
    FinanceManager,
    HRManager,
    Client
}

public enum LeadStatus
{
    New,
    Contacted,
    Qualified,
    ProposalSent,
    Negotiation,
    Won,
    Lost
}

public enum LeadPriority
{
    Low,
    Medium,
    High,
    Urgent
}

public enum ProjectStatus
{
    Planning,
    InDevelopment,
    InReview,
    Completed,
    OnHold,
    Cancelled
}

public enum TaskStatus
{
    Todo,
    InProgress,
    InReview,
    Done
}

public enum InvoiceStatus
{
    Draft,
    Sent,
    PartiallyPaid,
    Paid,
    Overdue,
    Cancelled
}

public enum ProposalStatus
{
    Draft,
    Sent,
    Accepted,
    Rejected,
    Expired
}

public enum AttendanceStatus
{
    Present,
    Absent,
    Late,
    HalfDay,
    OnLeave
}

public enum LeaveType
{
    Casual,
    Sick,
    Earned,
    Maternity,
    Paternity
}

public enum LeaveStatus
{
    Pending,
    Approved,
    Rejected
}

public enum CmsContentType
{
    BlogPost,
    Portfolio,
    Service,
    Testimonial,
    Faq
}

public enum NotificationChannel
{
    InApp,
    Email,
    WhatsApp,
    Sms
}
