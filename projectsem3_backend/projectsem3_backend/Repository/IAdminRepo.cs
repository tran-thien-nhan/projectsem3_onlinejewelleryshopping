using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IAdminRepo
    {
        Task<CustomResult> CreateAdmin(AdminLoginMst admin);
        Task<CustomResult> UpdateAdmin(string username, AdminLoginMst admin);
        Task<CustomResult> DeleteAdmin(string username);
        Task<CustomResult> GetAdminByUsername(string username);
        Task<CustomResult> GetAllAdmin();
        Task<CustomResult> UpdateOnlineStatusLogin(string username);
        Task<CustomResult> UpdateOnlineStatusLogout(string username);
    }
}
