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
        Task<DataToken> CheckLogin(AdminLoginMst adminlogin);
        Task<CustomResult> DeleteUser(string id);

        Task<List<UserRegMst>> GetAllUsersExcel();

        //activate user thông qua isverified
        Task<CustomResult> UpdateStatusUser(string userid);

        Task<CustomResult> VerifyUser(string userid);

        //updateuser
        Task<CustomResult> UpdateUser(UserRegMst userMst);
    }
}
