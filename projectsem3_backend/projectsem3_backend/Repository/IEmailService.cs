using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IEmailService
    {
        Task SendEmailConfirmationAsync(string toEmail, string orderId, List<OrderDetailMst> orderDetails, string orderpayment);

        Task<int> SendMailVerifyUserAsync(string toEmail, string token);

        Task<int> SendMailResetPasswordAsync(string toEmail, string token);

        Task<int> SendMailCancelOrderAsync(string toEmail, string orderId, string cancelreason);
    }
}
