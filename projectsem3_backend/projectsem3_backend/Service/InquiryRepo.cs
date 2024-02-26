using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class InquiryRepo : IInquiryRepo
    {
        private readonly DatabaseContext _db;
        private readonly EmailService emailService;
        private readonly IConfiguration _config;

        public InquiryRepo(DatabaseContext db, EmailService emailService, IConfiguration config)
        {
            _db = db;
            this.emailService = emailService;
            _config = config;
        }

        public async Task<CustomResult> GetAllInquiries()
        {
            try
            {
                var result = await _db.Inquiries.ToListAsync();
                return new CustomResult(200, "Get all inquiries success", result);
            }
            catch (Exception ex)
            {
                // Log the exception
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> GetInquiryById(string id)
        {
            try
            {
                var result = await _db.Inquiries.SingleOrDefaultAsync(i => i.ID == id);
                if (result == null)
                {
                    return new CustomResult(404, "Inquiry not found", null);
                }
                else
                {
                    return new CustomResult(200, "Get inquiry success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> CreateInquiry(Inquiry inquiry)
        {
            try
            {
                if (inquiry == null)
                {
                    return new CustomResult(400, "Invalid input. Inquiry is null.", null);
                }

                if (inquiry.Comment == null || inquiry.EmailID == null || inquiry.Name == null || inquiry.Contact == null || inquiry.City == null)
                {
                    return new CustomResult(400, "Invalid input. Inquiry is null.", null);
                }

                // Generate a new Inquiry_ID
                inquiry.ID = Guid.NewGuid().ToString();

                var user = await _db.UserRegMsts.SingleOrDefaultAsync(u => u.EmailID == inquiry.EmailID);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }

                inquiry.UserID = user.UserID;

                _db.Inquiries.Add(inquiry);
                var result = await _db.SaveChangesAsync();

                return result > 0 ? new CustomResult(201, "Created Success", inquiry) : new CustomResult(204, "No changes were made in the database", null);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> DeleteInquiry(string id)
        {
            try
            {
                var inquiry = await _db.Inquiries.SingleOrDefaultAsync(i => i.ID == id);
                if (inquiry == null)
                {
                    return new CustomResult(404, "Inquiry not found", null);
                }

                _db.Inquiries.Remove(inquiry);
                var result = await _db.SaveChangesAsync();

                return result == 1 ? new CustomResult(200, "Delete Success", inquiry) : new CustomResult(204, "No changes were made in the database", null);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateInquiryVisibility(string id)
        {
            try
            {
                var inquiry = await _db.Inquiries.SingleOrDefaultAsync(i => i.ID == id);
                if (inquiry == null)
                {
                    return new CustomResult(404, "Inquiry not found", null);
                }

                inquiry.Visible = !inquiry.Visible;
                _db.Inquiries.Update(inquiry);
                var result = await _db.SaveChangesAsync();

                return result == 1 ? new CustomResult(200, "Update Success", inquiry) : new CustomResult(204, "No changes were made in the database", null);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> ReplyInquiry(string id, string content)
        {
            try
            {
                var inquiryData = await _db.Inquiries.Where(i => i.ID == id)
                    .Include(u => u.UserRegMst)
                    .FirstOrDefaultAsync();

                //cập nhật reply
                inquiryData.Reply = content;
                _db.Inquiries.Update(inquiryData);
                await _db.SaveChangesAsync();

                var user = inquiryData.UserRegMst;
                var userEmail = user.EmailID;

                if (inquiryData == null)
                {
                    return new CustomResult(404, "Inquiry not found", null);
                }

                await emailService.SendMailReplyInquiryAsync(userEmail, inquiryData.Comment ,content);

                return new CustomResult(200, "Reply Success", inquiryData);
                
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }
    }
}
