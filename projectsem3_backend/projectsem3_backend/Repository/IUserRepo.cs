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

        //encode password   
        Task<CustomResult> TestEncodePassword(string password);

        //decode password
        Task<CustomResult> TestDecodePassword(string password);

        //send mail verify email user
        Task<CustomResult> SendMailVerifyUserToResetPasswordAsync(string toEmail);

        //reset password
        Task<CustomResult> ResetPassword(string userid, string password);

        //kiểm tra email
        Task<bool> CheckEmail(string email);

        //update password
        Task<CustomResult> UpdatePassword(string userid, string password);

        //active user
        Task<CustomResult> ActiveUser(string userid);

        //check password
        Task<bool> CheckPassword(string userid, string password);

        //đếm số lần mua hàng (số lượng order của userid đó)
        Task<int> CountOrderOfUser(string userid);

        //đếm số lần bị hủy hàng của userid đó
        Task<int> CountCancelOrderOfUser(string userid);
    }
}
