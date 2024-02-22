using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Helper;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class AdminRepo : IAdminRepo
    {
        private readonly DatabaseContext db;

        public AdminRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<CustomResult> CreateAdmin(AdminLoginMst admin)
        {
            try
            {
                //xóa chuỗi "@gmail.com" trong username
                admin.UserName = admin.UserName.Replace("@gmail.com", "");
                admin.Password = UserSecurity.HashPassword(admin.Password);
                admin.OnlineStatus = false;
                admin.LastAccessTime = DateTime.Now;
                
                admin.CreatedAt = DateTime.Now;
                admin.UpdatedAt = DateTime.Now;
                db.AdminLoginMsts.Add(admin);
                await db.SaveChangesAsync();
                return new CustomResult(200, "Success", admin);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> DeleteAdmin(string username)
        {
            try
            {
                var admin = await db.AdminLoginMsts.FindAsync(username);
                if (admin == null)
                {
                    return new CustomResult(404, "Not Found", null);
                }
                db.AdminLoginMsts.Remove(admin);
                await db.SaveChangesAsync();
                return new CustomResult(200, "Success", admin);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetAllAdmin()
        {
            try
            {
                var data = await db.AdminLoginMsts.ToListAsync();
                return new CustomResult(200, "Success", data);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetAdminByUsername(string username)
        {
            try
            {
                var data = await db.AdminLoginMsts.SingleOrDefaultAsync(a => a.UserName == username);
                if (data == null)
                {
                    return new CustomResult(404, "Not Found", null);
                }
                return new CustomResult(200, "Success", data);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateAdmin(string username, AdminLoginMst admin)
        {
            try
            {
                var data = await db.AdminLoginMsts.SingleOrDefaultAsync(a => a.UserName == admin.UserName);
                if (data == null)
                {
                    return new CustomResult(404, "Not Found", null);
                }

                var oldPassword = UserSecurity.VerifyPassword(admin.Password, data.Password);
                if (oldPassword)
                {
                    return new CustomResult(400, "Do not change Password", null);
                }

                admin.OnlineStatus = data.OnlineStatus;
                admin.LastAccessTime = data.LastAccessTime;
                admin.CreatedAt = data.CreatedAt;
                admin.UpdatedAt = DateTime.Now;
                db.Entry(data).CurrentValues.SetValues(admin);
                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "Success", admin);
                }
                else
                {
                    return new CustomResult(500, "Error", null);
                }

            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateOnlineStatus(string username)
        {
            try
            {
                var admin = await db.AdminLoginMsts.SingleOrDefaultAsync(a => a.UserName == username);
                if (admin == null)
                {
                    return new CustomResult(404, "Not Found", null);
                }
                admin.OnlineStatus = !admin.OnlineStatus;
                admin.LastAccessTime = DateTime.Now;
                db.AdminLoginMsts.Update(admin);
                await db.SaveChangesAsync();
                return new CustomResult(200, "Success", admin);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }
    }
}
