using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class UserRepo : IUserRepo
    {
        private readonly DatabaseContext db;

        public UserRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<CustomResult> CheckLogin(string email, string password)
        {
            try
            {
                var user = await db.UserRegMsts.SingleOrDefaultAsync(x => x.EmailID == email && x.Password == password);
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
            throw new NotImplementedException();
        }

        public async Task<CustomResult> Register(UserRegMst userMst)
        {
            throw new NotImplementedException();
        }
    }
}
