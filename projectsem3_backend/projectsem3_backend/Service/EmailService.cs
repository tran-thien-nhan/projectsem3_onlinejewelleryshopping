using MimeKit;
using projectsem3_backend.Models;
using System.Text;
using MailKit.Net.Smtp;
using projectsem3_backend.Repository;
using projectsem3_backend.CustomStatusCode;
using System.Net;
using DnsClient;
using static System.Net.WebRequestMethods;

namespace projectsem3_backend.Service
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailConfirmationAsync(string toEmail, string orderId, List<OrderDetailMst> orderDetails, string orderpayment)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("tran thien nhan", "pipclupnomad@gmail.com"));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Order Confirmation";

            var builder = new BodyBuilder();

            // Your template HTML with a table for order details
            StringBuilder template = new StringBuilder();
            template.AppendLine("<html>");
            template.AppendLine("<head>");
            template.AppendLine("<style>");
            // CSS inline để làm cho cột rộng ra hơn
            template.AppendLine("table { width: 100%; border-collapse: collapse; }");
            template.AppendLine("th, td { padding: 10px; text-align: left; }");
            template.AppendLine("th { background-color: #f2f2f2; }");
            template.AppendLine("</style>");
            template.AppendLine("</head>");
            template.AppendLine("<body>");
            template.AppendLine("<h2>Order Confirmation</h2>");
            template.AppendLine("<p>Thank you for your order. Below is the summary of your order:</p>");
            template.AppendLine($"<p>Order ID: {orderId}</p>");
            template.AppendLine($"<p>Order Payment method: {orderpayment}</p>");
            template.AppendLine("<table border='1'>");
            template.AppendLine("<tr>");
            template.AppendLine("<th style='width: 40%;'>Product</th>");
            template.AppendLine("<th style='width: 20%;'>Quantity</th>");
            template.AppendLine("<th style='width: 20%;'>MRP</th>");
            template.AppendLine("<th style='width: 20%;'>Total</th>");
            template.AppendLine("</tr>");

            decimal grandTotal = 0; // Biến để tích lũy tổng giá trị

            foreach (var detail in orderDetails)
            {
                template.AppendLine("<tr>");
                template.AppendLine($"<td>{detail.ItemMst?.Product_Name}</td>");
                template.AppendLine($"<td>{detail.Quantity}</td>");
                template.AppendLine($"<td>${detail.ItemMst?.MRP}</td>");
                template.AppendLine($"<td>${detail.ItemMst?.MRP * detail.Quantity}</td>");
                template.AppendLine("</tr>");

                // Cập nhật tổng giá trị
                grandTotal += detail.ItemMst?.MRP * detail.Quantity ?? 0;
            }

            // Thêm dòng hiển thị tổng giá trị
            template.AppendLine("<tr>");
            template.AppendLine("<td colspan='3' style='text-align: right;'>Total must pay:</td>");
            template.AppendLine($"<td>${grandTotal}</td>");
            template.AppendLine("</tr>");

            template.AppendLine("</table>");
            template.AppendLine("</body>");
            template.AppendLine("</html>");

            builder.HtmlBody = template.ToString();

            message.Body = builder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, false);
                await client.AuthenticateAsync("pipclupnomad@gmail.com", "gujv vlgk njad ghlt");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }

        public async Task<int> SendMailVerifyUserAsync(string toEmail, string token)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("tran thien nhan", "pipclupnomad@gmail.com"));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Verify Email";

            var builder = new BodyBuilder();

            // Template
            var htmlBody = $@"
            <html>
                <head>
                </head>
                <body>
                    <h2>Verify Email</h2>
                    <p>Click the link below to verify your email</p>
                    <a href='http://localhost:3000/verifyemailsuccess/{token}'>Verify Email</a>
                </body>
            </html>";

            builder.HtmlBody = htmlBody;

            message.Body = builder.ToMessageBody();

            try
            {
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 587, false);
                    await client.AuthenticateAsync("pipclupnomad@gmail.com", "gujv vlgk njad ghlt");
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                return 1; // Gửi email thành công
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                return 0; // Gửi email không thành công
            }
        }
        public async Task<int> SendMailResetPasswordAsync(string toEmail, string token)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclupnomad@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "Reset Password";

                var builder = new BodyBuilder();

                var htmlBody = $@"
                <html>
                    <head>
                    </head>
                    <body>
                        <h2>Reset Password</h2>
                        <p>Click the link below to reset your password</p>
                        <a href='http://localhost:3000/resetpassword/{token}'>Reset Password</a>
                        <p>link will be expired after 1 minutes</p>
                    </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclupnomad@gmail.com", "gujv vlgk njad ghlt");
                        await client.SendAsync(message);
                        await client.DisconnectAsync(true);
                    }

                    return 1; // Gửi email thành công
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending email: {ex.Message}");
                    return 0; // Gửi email không thành công
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                return 0; // Gửi email không thành công
            }
        }

        public async Task<int> SendMailCancelOrderAsync(string toEmail, string orderId, string cancelreason)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclupnomad@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "Cancel Order";

                var builder = new BodyBuilder();

                // Template
                var htmlBody = $@"
                <html>
                    <head>
                    </head>
                    <body>
                        <h2>Order Cancel</h2>
                        <p>Order ID: {orderId}</p>
                        <p>Reason: {cancelreason}</p>
                    </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclupnomad@gmail.com", "gujv vlgk njad ghlt");
                        await client.SendAsync(message);
                        await client.DisconnectAsync(true);
                    }

                    return 1; // Gửi email thành công
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending email: {ex.Message}");
                    return 0; // Gửi email không thành công
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                return 0; // Gửi email không thành công
            }
        }

        public async Task<int> SendMailOTPAsync(string toEmail, string otp)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclupnomad@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "OTP";

                var builder = new BodyBuilder();

                // Template
                var htmlBody = $@"
                <html>
                    <head>
                    </head>
                    <body>
                        <h2 style=""background: #00466a;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"">{otp}</h2>
                        <p>This OTP Will Be Expired After 1 minute</p>
                    </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclupnomad@gmail.com", "gujv vlgk njad ghlt");
                        await client.SendAsync(message);
                        await client.DisconnectAsync(true);
                    }

                    return 1; // Gửi email thành công
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending email: {ex.Message}");
                    return 0; // Gửi email không thành công
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                return 0; // Gửi email không thành công
            }
        }

        public async Task<int> SendMailShippingAsync(string toEmail, string orderId)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclupnomad@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "Order Is Shipping";

                var builder = new BodyBuilder();

                // Template
                var htmlBody = $@"
                <html>
                    <head>
                    </head>
                    <body>
                        <p>Order Id: {orderId}</p>
                        <p>Status: Is Shipping</p>
                    </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclupnomad@gmail.com", "gujv vlgk njad ghlt");
                        await client.SendAsync(message);
                        await client.DisconnectAsync(true);
                    }

                    return 1; // Gửi email thành công
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending email: {ex.Message}");
                    return 0; // Gửi email không thành công
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                return 0; // Gửi email không thành công
            }
        }

        public async Task<int> SendMailDeliveredAsync(string toEmail, string orderId)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclupnomad@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "Order Shipping Success !";

                var builder = new BodyBuilder();

                // Template
                var htmlBody = $@"
                <html>
                    <head>
                    </head>
                    <body>
                        <p>Order Id: {orderId}</p>
                        <p>Status: Ship Successfully !</p>
                    </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclupnomad@gmail.com", "gujv vlgk njad ghlt");
                        await client.SendAsync(message);
                        await client.DisconnectAsync(true);
                    }

                    return 1; // Gửi email thành công
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending email: {ex.Message}");
                    return 0; // Gửi email không thành công
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending email: {ex.Message}");
                return 0; // Gửi email không thành công
            }
        }
    }
}
