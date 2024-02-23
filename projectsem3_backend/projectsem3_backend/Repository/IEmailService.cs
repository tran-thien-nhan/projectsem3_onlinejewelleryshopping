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

        Task<int> SendMailOTPAsync(string toEmail, string otp);

        //gửi mail thông báo đơn hàng đang vận chuyển
        Task<int> SendMailShippingAsync(string toEmail, string orderId);

        //gửi mail thông báo đơn hàng được giao thành công
        Task<int> SendMailDeliveredAsync(string toEmail, string orderId);
    }
}
