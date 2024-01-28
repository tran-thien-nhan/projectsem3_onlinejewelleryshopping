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

        public UserRepo(DatabaseContext db, IConfiguration configuration)
        {
            this.db = db;
            this.configuration = configuration;
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
            throw new NotImplementedException();
        }
    }
}
