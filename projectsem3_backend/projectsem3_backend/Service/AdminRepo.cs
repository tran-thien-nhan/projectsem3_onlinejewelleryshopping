using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
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
            throw new NotImplementedException();
        }

        public async Task<CustomResult> DeleteAdmin(string id)
        {
            throw new NotImplementedException();
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

        public async Task<CustomResult> GetAdminById(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<CustomResult> UpdateAdmin(AdminLoginMst admin)
        {
            throw new NotImplementedException();
        }
    }
}
