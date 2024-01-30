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
                    var tokenString = TokenService.GenerateJSONWebTokenUser(configuration, user, user.UserID);
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
                        .Where(x => x.UserName.ToLower() == userMst.UserName.ToLower() || x.EmailID.ToLower() == userMst.EmailID.ToLower())
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

                    userMst.CDate = DateTime.Now;
                    userMst.CreatedAt = DateTime.Now;
                    userMst.UpdatedAt = DateTime.Now;
                    userMst.IsVerified = false;

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
                var existingUser = await db.UserRegMsts.FirstOrDefaultAsync(x => x.UserID == userMst.UserID);
                if (existingUser == null)
                {
                    return new CustomResult(404, "User not found", null);
                }

                // Kiểm tra trùng lặp username
                var isUsernameExists = await db.UserRegMsts
                    .Where(x => x.UserID != userMst.UserID)
                    .AnyAsync(x => x.UserName.ToLower() == userMst.UserName.ToLower());

                if (isUsernameExists)
                {
                    return new CustomResult(400, "Username already exists", null);
                }

                // Kiểm tra trùng lặp email
                var isEmailExists = await db.UserRegMsts
                    .Where(x => x.UserID != userMst.UserID)
                    .AnyAsync(x => x.EmailID.ToLower() == userMst.EmailID.ToLower());

                if (isEmailExists)
                {
                    return new CustomResult(400, "Email already exists", null);
                }

                // Kiểm tra trùng lặp số điện thoại
                var isMobNoExists = await db.UserRegMsts
                    .Where(x => x.UserID != userMst.UserID)
                    .AnyAsync(x => x.MobNo.ToLower() == userMst.MobNo.ToLower());

                if (isMobNoExists)
                {
                    return new CustomResult(400, "MobNo already exists", null);
                }

                // Cập nhật thông tin người dùng nếu không có lỗi trùng lặp
                existingUser.UserName = userMst.UserName;
                existingUser.Password = userMst.Password;
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
    }
}
