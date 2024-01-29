using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Helper;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace projectsem3_backend.Service
{
    public class UserRepo : IUserRepo
    {
        private readonly DatabaseContext db;
        private readonly IConfiguration configuration;
        private readonly IEmailService emailService;

        public UserRepo(DatabaseContext db, IConfiguration configuration, IEmailService emailService)
        {
            this.db = db;
            this.configuration = configuration;
            this.emailService = emailService;
        }

        [NonAction]
        private async Task<UserRegMst> AuthenticateUser(AdminLoginMst adminLogin)
        {
            var currentUser = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserName.ToLower() == adminLogin.UserName.ToLower() && x.Password.ToLower() == adminLogin.Password.ToLower());
            if (currentUser != null)
            {
                return currentUser;
            }
            return null;
        }

        [NonAction]
        private async Task<AdminLoginMst> AuthenticateAdmin(AdminLoginMst adminLogin)
        {
            var currentAdmin = await db.AdminLoginMsts.FirstOrDefaultAsync(x => x.UserName.ToLower() == adminLogin.UserName.ToLower() && x.Password.ToLower() == adminLogin.Password.ToLower());
            if (currentAdmin != null)
            {
                return currentAdmin;
            }
            return null;
        }

        public async Task<DataToken> CheckLogin(AdminLoginMst adminlogin)
        {
            try
            {
                var user = await AuthenticateUser(adminlogin);
                var admin = await AuthenticateAdmin(adminlogin);
                if (user != null)
                {
                    var tokenString = TokenService.GenerateJSONWebTokenUser(configuration, user);
                    return new DataToken(200, "Success, this is user", user, tokenString, "user");
                }
                else if (admin != null)
                {
                    var tokenString = TokenService.GenerateJSONWebTokenAdmin(configuration, admin);
                    return new DataToken(200, "Success, this is admin", admin, tokenString, "admin");
                }
                else
                {
                    return new DataToken(404, "User not found", null, null, null);
                }
            }
            catch (Exception e)
            {
                return new DataToken(500, e.Message, null, null, null);
            }
        }

        public async Task<CustomResult> DeleteUser(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomResult> GetAllUser()
        {
            try
            {
                var users = await db.UserRegMsts.ToListAsync();
                if (users == null)
                {
                    return new CustomResult(404, "User not found", null);
                }
                return new CustomResult(200, "Success", users);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<List<UserRegMst>> GetAllUsersExcel()
        {
            var uselist = await db.UserRegMsts.ToListAsync();
            return uselist;
        }

        public async Task<CustomResult> GetUserById(string id)
        {
            try
            {
                var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == id);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }
                return new CustomResult(200, "Success", user);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> Register(UserRegMst userMst)
        {
            using (var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    // Kiểm tra xem có người dùng nào có cùng UserName hoặc EmailID không
                    var existingUser = await db.UserRegMsts
                        .Where(x => x.UserName.ToLower() == userMst.UserName.ToLower() || x.EmailID.ToLower() == userMst.EmailID.ToLower())
                        .FirstOrDefaultAsync();

                    // Nếu đã tồn tại người dùng, trả về lỗi
                    if (existingUser != null)
                    {
                        return new CustomResult(404, "User already exists", null);
                    }

                    // Gửi mail verify
                    var token = TokenService.GenerateJSONWebTokenUser(configuration, userMst);

                    // Thử gửi mail
                    var emailResult = await emailService.SendMailVerifyUserAsync(userMst.EmailID, token);

                    // Kiểm tra kết quả gửi mail
                    if (emailResult == 0)
                    {
                        // Nếu gửi email không thành công, trả về lỗi và không tiếp tục thêm vào cơ sở dữ liệu
                        transaction.Rollback();
                        return new CustomResult(500, "Failed to send email", null);
                    }
                    else if (emailResult == -2)
                    {
                        // Nếu địa chỉ mail không tồn tại, trả về thông báo lỗi và không tiếp tục thêm vào cơ sở dữ liệu
                        transaction.Rollback();
                        return new CustomResult(500, "Email address does not exist", null);
                    }

                    // Kiểm tra tính hợp lệ của địa chỉ email trước khi thêm vào cơ sở dữ liệu
                    var isValidEmail = ValidateEmail(userMst.EmailID);

                    if (!isValidEmail)
                    {
                        // Nếu địa chỉ email không hợp lệ, trả về lỗi và không tiếp tục thêm vào cơ sở dữ liệu
                        transaction.Rollback();
                        return new CustomResult(500, "Invalid email address", null);
                    }

                    // Không có người dùng tồn tại và địa chỉ email hợp lệ, thực hiện thêm mới
                    userMst.UserID = Guid.NewGuid().ToString();
                    userMst.CDate = DateTime.Now;
                    userMst.CreatedAt = DateTime.Now;
                    userMst.UpdatedAt = DateTime.Now;

                    // Thêm mới người dùng vào DbContext
                    await db.UserRegMsts.AddAsync(userMst);

                    // Lưu thay đổi vào cơ sở dữ liệu
                    var result = await db.SaveChangesAsync();

                    // Kiểm tra xem lưu dữ liệu có thành công không
                    if (result == 0)
                    {
                        transaction.Rollback();
                        return new CustomResult(404, "Sign up failed", null);
                    }
                    else
                    {
                        transaction.Commit();
                        return new CustomResult(200, "Success", userMst);
                    }
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    // Nếu không tìm thấy địa chỉ email để verify, rollback transaction và trả về thông báo lỗi
                    transaction.Rollback();
                    if (ex.Entries.Count > 0)
                    {
                        // Lấy ra entry đầu tiên
                        var entry = ex.Entries[0];
                        if (entry.Entity is UserRegMst)
                        {
                            // Kiểm tra nếu đối tượng đã bị xóa
                            if (entry.State == EntityState.Deleted)
                            {
                                return new CustomResult(500, "Email address not found for verification", null);
                            }
                        }
                    }

                    // Nếu không phải trường hợp xóa, trả về thông báo lỗi chung
                    return new CustomResult(500, ex.Message, null);
                }
                catch (Exception e)
                {
                    // Nếu có lỗi khác, rollback transaction và trả về thông báo lỗi
                    transaction.Rollback();
                    return new CustomResult(500, e.Message, null);
                }
            }
        }

        public async Task<CustomResult> VerifyEmail(string token)
        {
            try
            {
                var userId = TokenService.ValidateAndExtractUserId(configuration, token);

                if (userId != null)
                {
                    var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == userId);

                    if (user != null)
                    {
                        await db.SaveChangesAsync();

                        // Redirect hoặc trả về thông báo xác minh thành công
                        return new CustomResult(200, "Success", user);
                    }
                }

                return new CustomResult(404, "email not found", null);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        private bool ValidateEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}
