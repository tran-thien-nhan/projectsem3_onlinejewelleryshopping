using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IEmailService
    {
        Task SendEmailConfirmationAsync(string toEmail, string orderId, List<OrderDetailMst> orderDetails);
    }
}
