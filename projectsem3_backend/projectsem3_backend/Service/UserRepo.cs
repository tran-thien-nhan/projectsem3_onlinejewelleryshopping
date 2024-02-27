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
            var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserName.ToLower() == adminLogin.UserName.ToLower() || x.EmailID.ToLower() == adminLogin.UserName.ToLower());

            if (user != null && UserSecurity.VerifyPassword(adminLogin.Password, user.Password))
            {
                return user;
            }

            return null;
        }

        [NonAction]
        private async Task<AdminLoginMst> AuthenticateAdmin(AdminLoginMst adminLogin)
        {
            var admin = await db.AdminLoginMsts.FirstOrDefaultAsync(x => x.UserName.ToLower() == adminLogin.UserName.ToLower() || x.AdminEmail.ToLower() == adminLogin.UserName.ToLower());
            if (admin != null && UserSecurity.VerifyPassword(adminLogin.Password, admin.Password))
            {
                return admin;
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
                    user.OnlineStatus = true;
                    var tokenString = TokenService.GenerateJSONWebTokenUser(configuration, user, user.UserID);
                    return new DataToken(200, "Success, this is user", user, tokenString, "user");
                }
                else if (admin != null)
                {
                    admin.OnlineStatus = true;
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
            try
            {
                var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == id);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }
                db.UserRegMsts.Remove(user);
                await db.SaveChangesAsync();
                return new CustomResult(200, "Success", user);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
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
                        .Where(x => x.UserName.ToLower() == userMst.UserName.ToLower() ||
                        x.EmailID.ToLower() == userMst.EmailID.ToLower() ||
                        x.MobNo == userMst.MobNo)
                        .FirstOrDefaultAsync();

                    // Nếu đã tồn tại người dùng, trả về lỗi
                    if (existingUser != null)
                    {
                        return new CustomResult(404, "User already exists", null);
                    }

                    userMst.UserID = Guid.NewGuid().ToString();

                    // Gửi mail verify
                    var token = TokenService.GenerateJSONWebTokenUser(configuration, userMst, userMst.UserID);

                    // Thử gửi mail
                    var emailResult = await emailService.SendMailVerifyUserAsync(userMst.EmailID, token);

                    // Nếu gửi mail thất bại, trả về lỗi
                    if (emailResult == 0)
                    {
                        transaction.Rollback();
                        return new CustomResult(404, "Send mail failed", null);
                    }

                    userMst.Password = UserSecurity.HashPassword(userMst.Password);
                    userMst.CDate = DateTime.Now;
                    userMst.CreatedAt = DateTime.Now;
                    userMst.UpdatedAt = DateTime.Now;
                    userMst.IsVerified = false;
                    userMst.Activate = true;
                    userMst.OnlineStatus = false; // Đặt trạng thái trực tuyến
                    userMst.LastAccessTime = DateTime.Now; // Đặt thời gian truy cập gần nhất

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


        public async Task<CustomResult> UpdateStatusUser(string userid)
        {
            try
            {
                var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == userid);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }
                user.IsVerified = !user.IsVerified;
                await db.SaveChangesAsync();
                return new CustomResult(200, "Success", user);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> VerifyUser(string userid)
        {
            try
            {
                var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == userid);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }
                user.IsVerified = true;
                await db.SaveChangesAsync();
                return new CustomResult(200, "Success", user);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateUser(UserRegMst userMst)
        {
            try
            {
                // Kiểm tra xem có user khác sử dụng UserName này chưa
                var isUserNameExists = await db.UserRegMsts.AnyAsync(x => x.UserName == userMst.UserName && x.UserID != userMst.UserID);
                if (isUserNameExists)
                {
                    return new CustomResult(400, "UserName already exists", null);
                }

                var existingUser = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == userMst.UserID);
                if (existingUser == null)
                {
                    return new CustomResult(404, "User not found", null);
                }

                existingUser.UserName = userMst.UserName;
                existingUser.Password = UserSecurity.HashPassword(userMst.Password);
                existingUser.UserLname = userMst.UserLname;
                existingUser.UserFname = userMst.UserFname;
                existingUser.EmailID = userMst.EmailID;
                existingUser.MobNo = userMst.MobNo;
                existingUser.Address = userMst.Address;
                existingUser.City = userMst.City;
                existingUser.State = userMst.State;

                db.UserRegMsts.Update(existingUser);
                await db.SaveChangesAsync();

                return new CustomResult(200, "Success", existingUser);
            }
            catch (Exception e)
            {
                return new CustomResult(500, "Lỗi hệ thống: " + e.Message, null);
            }
        }


        public async Task<CustomResult> TestEncodePassword(string password)
        {
            try
            {
                var ressult = UserSecurity.HashPassword(password);
                if (ressult == null)
                {
                    return new CustomResult(404, "Password not found", null);
                }
                else
                {
                    StaticPasswordTest.HashPassword = ressult;
                    return new CustomResult(200, "Success", ressult);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> TestDecodePassword(string password)
        {
            try
            {
                var hashpass = StaticPasswordTest.HashPassword;
                bool result = UserSecurity.VerifyPassword(password, hashpass);
                if (!result)
                {
                    return new CustomResult(404, "Password not found", false);
                }
                else
                {
                    return new CustomResult(200, "Success", true);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> SendMailVerifyUserToResetPasswordAsync(string toEmail)
        {
            try
            {
                var user = await db.UserRegMsts.SingleOrDefaultAsync(x => x.EmailID == toEmail);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }

                var token = TokenService.GenerateJSONWebTokenExpiredDateForgotPassword(configuration, user.UserID);
                var emailResult = await emailService.SendMailResetPasswordAsync(toEmail, token);
                if (emailResult == 0)
                {
                    return new CustomResult(404, "Send mail failed", null);
                }
                return new CustomResult(200, "Success", user);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> ResetPassword(string userid, string password)
        {
            try
            {
                var user = await db.UserRegMsts.SingleOrDefaultAsync(x => x.UserID == userid);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }

                //user.Password = UserSecurity.HashPassword(password);
                user.Password = UserSecurity.HashPassword(password);
                db.UserRegMsts.Update(user);
                await db.SaveChangesAsync();

                return new CustomResult(200, "Success", user);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<bool> CheckEmail(string email)
        {
            try
            {
                var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.EmailID == email);
                if (user == null)
                {
                    return false;
                }
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<CustomResult> UpdatePassword(string userid, string password)
        {
            try
            {
                var user = await db.UserRegMsts.SingleOrDefaultAsync(x => x.UserID == userid);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }

                user.Password = UserSecurity.HashPassword(password);
                db.UserRegMsts.Update(user);
                await db.SaveChangesAsync();

                return new CustomResult(200, "Success", user);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> ActiveUser(string userid)
        {
            try
            {
                var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == userid);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }
                user.Activate = !user.Activate;
                if(user.Activate == false)
                {
                    await emailService.SendMailBanUserAsync(user.EmailID);
                }
                await db.SaveChangesAsync();
                return new CustomResult(200, "Success", user);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<bool> CheckPassword(string userid, string password)
        {
            try
            {
                var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == userid);
                if (user == null)
                {
                    return false;
                }
                var result = UserSecurity.VerifyPassword(password, user.Password);
                if (!result)
                {
                    return false;
                }
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<CustomResult> CountOrderDetailOfUser(string userid)
        {
            try
            {
                var userOrderDetailCount = await db.UserRegMsts
                                    .Include(x => x.OrderMsts)
                                    .ThenInclude(x => x.OrderDetailMsts)
                                    .SingleOrDefaultAsync(x => x.UserID == userid);

                if (userOrderDetailCount == null)
                {
                    return new CustomResult(404, "User not found", null);
                }
                int count = 0;
                foreach (var order in userOrderDetailCount.OrderMsts.Where(o => o.OrderStatus == 3))
                {
                    foreach (var orderDetail in order.OrderDetailMsts)
                    {
                        count += (order.OrderDetailMsts.Count * (int)orderDetail.Quantity);
                    }
                }
                return new CustomResult(200, "Success", count);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<int> CountCancelOrderOfUser(string userid)
        {
            try
            {
                var userOrderCount = await db.UserRegMsts.Include(x => x.OrderMsts).FirstOrDefaultAsync(x => x.UserID == userid);
                if (userOrderCount == null)
                {
                    return 0;
                }
                int count = 0;
                foreach (var order in userOrderCount.OrderMsts)
                {
                    if (order.OrderStatus == 4)
                    {
                        count++;
                    }
                }
                return count;
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public async Task<CustomResult> UpdateOnlineStatusLogin(string userid)
        {
            try
            {
                var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == userid);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }
                user.OnlineStatus = true;
                user.LastAccessTime = DateTime.Now;
                await db.SaveChangesAsync();
                return new CustomResult(200, "Success", user);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateOnlineStatusLogout(string userid)
        {
            try
            {
                var user = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == userid);
                if (user == null)
                {
                    return new CustomResult(404, "User not found", null);
                }
                user.OnlineStatus = false;
                user.LastAccessTime = DateTime.Now;
                await db.SaveChangesAsync();
                return new CustomResult(200, "Success", user);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }
    }
}
