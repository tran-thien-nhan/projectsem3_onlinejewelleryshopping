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
            message.From.Add(new MailboxAddress("tran thien nhan", "pipclup28061997@gmail.com"));
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
                await client.AuthenticateAsync("pipclup28061997@gmail.com", "dxoy efnz styi fwvh");
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }

        public async Task<int> SendMailVerifyUserAsync(string toEmail, string token)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("tran thien nhan", "pipclup28061997@gmail.com"));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Verify Email";

            var builder = new BodyBuilder();

            // Template
            var htmlBody = $@"
            <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: auto;
                            padding: 20px;
                            text-align: center;
                        }}
                        .button {{
                            display: inline-block;
                            background-color: #007bff;
                            color: #fff;
                            padding: 10px 20px;
                            text-decoration: none;
                            border-radius: 5px;
                        }}
                        .button:hover {{
                            background-color: #0056b3;
                        }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <h2>Verify Email</h2>
                        <p>Click the button below to verify your email</p>
                        <a href='http://localhost:3000/verifyemailsuccess/{token}' class='button' style='color: white'>Verify Email</a>
                    </div>
                </body>
            </html>";


            builder.HtmlBody = htmlBody;

            message.Body = builder.ToMessageBody();

            try
            {
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 587, false);
                    await client.AuthenticateAsync("pipclup28061997@gmail.com", "dxoy efnz styi fwvh");
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
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclup28061997@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "Reset Password";

                var builder = new BodyBuilder();

                var htmlBody = $@"
                <html>
                    <head>
                        <style>
                            body {{
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                            }}
                            .container {{
                                max-width: 600px;
                                margin: auto;
                                padding: 20px;
                                text-align: center;
                            }}
                            .button {{
                                display: inline-block;
                                background-color: #007bff;
                                color: #fff;
                                padding: 10px 20px;
                                text-decoration: none;
                                border-radius: 5px;
                            }}
                            .button:hover {{
                                background-color: #0056b3;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h2>Reset Password</h2>
                            <p>Click the button below to reset your password</p>
                            <a href='http://localhost:3000/resetpassword/{token}' class='button' style='color: white'>Reset Password</a>
                            <p>link will be expired after 1 minute</p>
                        </div>
                    </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclup28061997@gmail.com", "dxoy efnz styi fwvh");
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
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclup28061997@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "Cancel Order";

                var builder = new BodyBuilder();

                // Template
                var htmlBody = $@"
                <html>
                    <head>
                        <style>
                            body {{
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                            }}
                            .container {{
                                max-width: 600px;
                                margin: auto;
                                padding: 20px;
                                text-align: center;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h2>Order Cancel</h2>
                            <p>Order ID: {orderId}</p>
                            <p>Reason: {cancelreason}</p>
                        </div>
                    </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclup28061997@gmail.com", "dxoy efnz styi fwvh");
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
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclup28061997@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "OTP";

                var builder = new BodyBuilder();

                // Template
                var htmlBody = $@"
                <html>
                    <head>
                        <style>
                            body {{
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                            }}
                            .container {{
                                max-width: 600px;
                                margin: auto;
                                padding: 20px;
                                text-align: center;
                            }}
                            .otp-container {{
                                display: flex;
                                justify-content: center;
                            }}
                            .otp {{
                                background: #00466a;
                                width: max-content;
                                padding: 10px;
                                color: #fff;
                                border-radius: 4px;
                                margin: auto;
                                display: table;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h2>One-Time Password (OTP)</h2>
                            <p>Your OTP:</p>
                            <div class='otp-container'>
                                <h2 class='otp'>{otp}</h2>
                            </div>
                            <p>This OTP will expire after 1 minute</p>
                        </div>
                    </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclup28061997@gmail.com", "dxoy efnz styi fwvh");
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
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclup28061997@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "Order Is Shipping";

                var builder = new BodyBuilder();

                // Template
                var htmlBody = $@"
                <html>
                    <head>
                        <style>
                            body {{
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                            }}
                            .container {{
                                max-width: 600px;
                                margin: auto;
                                padding: 20px;
                                text-align: center;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h2>Order Shipping Notification</h2>
                            <p>Order Id: {orderId}</p>
                            <p>Status: Is Shipping</p>
                        </div>
                    </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclup28061997@gmail.com", "dxoy efnz styi fwvh");
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
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclup28061997@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "Order Shipping Success !";

                var builder = new BodyBuilder();

                // Template
                var htmlBody = $@"
                <html>
                    <head>
                        <style>
                            body {{
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                            }}
                            .container {{
                                max-width: 600px;
                                margin: auto;
                                padding: 20px;
                                text-align: center;
                            }}
                        </style>
                    </head>
                    <body>
                        <div class='container'>
                            <h2>Order Delivered Notification</h2>
                            <p>Order Id: {orderId}</p>
                            <p>Status: Ship Successfully !</p>
                        </div>
                    </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclup28061997@gmail.com", "dxoy efnz styi fwvh");
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

        public async Task<int> SendMailReplyInquiryAsync(string toEmail, string inquiryContent, string content)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("tran thien nhan", "pipclup28061997@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "Reply Inquiry !";

                var builder = new BodyBuilder();

                // Template
                var htmlBody = $@"
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='UTF-8'>
                    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }}
                        .container {{
                            max-width: 600px;
                            margin: auto;
                            padding: 20px;
                            text-align: center;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }}
                        h2 {{
                            color: #333;
                        }}
                        p {{
                            margin: 10px 0;
                        }}
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <h2>Inquiry Reply</h2>
                        <p><strong>Your Inquiry:</strong> {inquiryContent}</p>
                        <p><strong>Our Response:</strong> {content}</p>
                    </div>
                </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();
                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclup28061997@gmail.com", "dxoy efnz styi fwvh");
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

        public async Task<int> SendMailBanUserAsync(string toEmail)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Tran Thien Nhan", "pipclup28061997@gmail.com"));
                message.To.Add(new MailboxAddress("", toEmail));
                message.Subject = "Ban Notification";

                var builder = new BodyBuilder();

                // Template
                var htmlBody = @"
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset='UTF-8'>
                    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }
                        .container {
                            max-width: 600px;
                            margin: auto;
                            padding: 20px;
                            text-align: center;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        h2 {
                            color: #333;
                        }
                        .ban-message {
                            background-color: #ff3333;
                            color: #fff;
                            padding: 10px;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <h2>Ban Notification</h2>
                        <p>You have been banned from our platform.</p>
                        <p>Please contact support for further information.</p>
                        <p>Thank you.</p>
                    </div>
                </body>
                </html>";

                builder.HtmlBody = htmlBody;
                message.Body = builder.ToMessageBody();

                try
                {
                    using (var client = new SmtpClient())
                    {
                        await client.ConnectAsync("smtp.gmail.com", 587, false);
                        await client.AuthenticateAsync("pipclup28061997@gmail.com", "dxoy efnz styi fwvh");
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
