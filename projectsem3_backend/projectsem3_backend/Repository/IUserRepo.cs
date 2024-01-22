using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IUserRepo
    {
        Task<CustomResult> GetAllUser();
        Task<CustomResult> GetUserById(string id);
        Task<CustomResult> Register(UserRegMst userMst);

        //checklogin
        Task<CustomResult> CheckLogin(string email, string password);
        Task<CustomResult> DeleteUser(string id);
    }
}
