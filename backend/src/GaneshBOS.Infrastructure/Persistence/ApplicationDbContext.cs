using GaneshBOS.Application.Interfaces;
using GaneshBOS.Domain.Common;
using GaneshBOS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GaneshBOS.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Company> Companies => Set<Company>();
    public DbSet<Contact> Contacts => Set<Contact>();
    public DbSet<Lead> Leads => Set<Lead>();
    public DbSet<LeadActivity> LeadActivities => Set<LeadActivity>();
    public DbSet<Proposal> Proposals => Set<Proposal>();
    public DbSet<ProposalItem> ProposalItems => Set<ProposalItem>();
    public DbSet<Invoice> Invoices => Set<Invoice>();
    public DbSet<InvoiceItem> InvoiceItems => Set<InvoiceItem>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Milestone> Milestones => Set<Milestone>();
    public DbSet<ProjectTask> ProjectTasks => Set<ProjectTask>();
    public DbSet<TimeLog> TimeLogs => Set<TimeLog>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Attendance> Attendances => Set<Attendance>();
    public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();
    public DbSet<Expense> Expenses => Set<Expense>();
    public DbSet<CmsItem> CmsItems => Set<CmsItem>();
    public DbSet<WhatsAppMessageLog> WhatsAppMessageLogs => Set<WhatsAppMessageLog>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<SystemSetting> SystemSettings => Set<SystemSetting>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Global Query Filter for Soft Delete
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(ISoftDelete).IsAssignableFrom(entityType.ClrType))
            {
                modelBuilder.Entity(entityType.ClrType)
                    .HasQueryFilter(ConvertFilterExpression<ISoftDelete>(e => !e.IsDeleted));
            }
        }

        // Indexes & Constraints
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.Entity<Lead>().HasIndex(l => l.Status);
        modelBuilder.Entity<Invoice>().HasIndex(i => i.InvoiceNumber).IsUnique();
        modelBuilder.Entity<Proposal>().HasIndex(p => p.ProposalNumber).IsUnique();
        modelBuilder.Entity<Employee>().HasIndex(e => e.EmployeeCode).IsUnique();
    }

    private static System.Linq.Expressions.LambdaExpression ConvertFilterExpression<TInterface>(
        System.Linq.Expressions.Expression<Func<TInterface, bool>> filterExpression)
    {
        var newParam = System.Linq.Expressions.Expression.Parameter(filterExpression.Parameters[0].Type);
        var newBody = System.Linq.Expressions.ReplacingExpressionVisitor.Replace(
            filterExpression.Body, filterExpression.Parameters[0], newParam);
        return System.Linq.Expressions.Expression.Lambda(newBody, newParam);
    }
}
