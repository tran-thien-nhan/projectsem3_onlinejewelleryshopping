using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IAdminRepo
    {
        Task<CustomResult> CreateAdmin(AdminLoginMst admin);
        Task<CustomResult> UpdateAdmin(AdminLoginMst admin);
        Task<CustomResult> DeleteAdmin(string id);
        Task<CustomResult> GetAdminById(string id);
        Task<CustomResult> GetAllAdmin();

    }
}
