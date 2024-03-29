﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;
using projectsem3_backend.Service;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo userRepo;
        private readonly IExcelHandler excelHandler;

        public UserController(IUserRepo userRepo, IExcelHandler excelHandler)
        {
            this.userRepo = userRepo;
            this.excelHandler = excelHandler;
        }

        [HttpGet("checklogin/{username}/{password}")]
        public async Task<DataToken> CheckLogin(string username, string password)
        {
            try
            {
                return await userRepo.CheckLogin(new AdminLoginMst { UserName = username, Password = password });
            }
            catch (Exception e)
            {
                return new DataToken(404, e.Message, null, null, null);
            }
        }

        [HttpGet("getalluser")]
        public async Task<CustomResult> GetAllUser()
        {
            return await userRepo.GetAllUser();
        }

        [HttpGet("getalluserexcel")]
        public async Task<IActionResult> GetAllUserExcel()
        {
            try
            {
                var userlist = await userRepo.GetAllUsersExcel();
                var excelStream = await excelHandler.ExportToExcel<UserRegMst>(userlist);
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.Headers.Add("Content-Disposition", $"attachment; filename=UserReport_{DateTime.Now.Ticks}.xlsx");

                // Return the Excel as a file stream
                return File(excelStream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("getuserbyid/{id}")]
        public async Task<CustomResult> GetUserById(string id)
        {
            return await userRepo.GetUserById(id);
        }

        [HttpPost("register")]
        public async Task<CustomResult> Register([FromForm] UserRegMst user)
        {
            return await userRepo.Register(user);
        }

        [HttpPut("updatestatususer/{userid}")]
        public async Task<CustomResult> UpdateStatusUser(string userid)
        {
            return await userRepo.UpdateStatusUser(userid);
        }

        [HttpDelete("deleteuser/{id}")]
        public async Task<CustomResult> DeleteUser(string id)
        {
            return await userRepo.DeleteUser(id);
        }

        [HttpPut("verifyuser/{userid}")]
        public async Task<CustomResult> VerifyUser(string userid)
        {
            return await userRepo.VerifyUser(userid);
        }

        [HttpGet("sendmailverifyuser/{toemail}")]
        public async Task<CustomResult> SendMailVerifyEmailUserToResetPasswordAsync(string toemail)
        {
            return await userRepo.SendMailVerifyUserToResetPasswordAsync(toemail);
        }

        [HttpGet("checkemail/{email}")]
        public async Task<bool> CheckEmail(string email)
        {
            return await userRepo.CheckEmail(email);
        }

        [HttpPut("resetpassword/{userid}/{password}")]
        public async Task<CustomResult> ResetPassword(string userid, string password)
        {
            return await userRepo.ResetPassword(userid, password);
        }

        [HttpPut("updateuser/{userid}")]
        public async Task<CustomResult> UpdateUser(string userid, [FromForm] UserRegMst user)
        {
            if (userid != user.UserID)
            {
                return new CustomResult(400, "User id not match", null);
            }

            var updateuser = await userRepo.UpdateUser(user);
            if (updateuser == null)
            {
                return new CustomResult(400, "Update user failed", null);
            }
            return new CustomResult(200, "Update user successfully", updateuser);
        }

        [HttpGet("test/encodepassword/{password}")]
        public async Task<CustomResult> EncodePassword(string password)
        {
            return await userRepo.TestEncodePassword(password);
        }

        [HttpGet("test/decodepassword/{password}")]
        public async Task<CustomResult> DecodePassword(string password)
        {
            return await userRepo.TestDecodePassword(password);
        }

        [HttpPut("updatepassword/{userid}/{password}")]
        public async Task<CustomResult> UpdatePassword(string userid, string password)
        {
            return await userRepo.UpdatePassword(userid, password);
        }

        [HttpPut("activeuser/{userid}")]
        public async Task<CustomResult> ActiveUser(string userid)
        {
            return await userRepo.ActiveUser(userid);
        }

        [HttpGet("checkpassword/{userid}/{password}")]
        public async Task<bool> CheckPassword(string userid, string password)
        {
            return await userRepo.CheckPassword(userid, password);
        }

        [HttpGet("countorderofuser/{userid}")]
        public async Task<CustomResult> CountOrderOfUser(string userid)
        {
            return await userRepo.CountOrderDetailOfUser(userid);
        }

        [HttpGet("countcancelorderofuser/{userid}")]
        public async Task<int> CountCancelOrderOfUser(string userid)
        {
            return await userRepo.CountCancelOrderOfUser(userid);
        }

        [HttpGet("updateonlinestatuslogin/{userid}")]
        public async Task<CustomResult> UpdateOnlineStatus(string userid)
        {
            return await userRepo.UpdateOnlineStatusLogin(userid);
        }

        [HttpGet("updateonlinestatuslogout/{userid}")]
        public async Task<CustomResult> UpdateOnlineStatusLogout(string userid)
        {
            return await userRepo.UpdateOnlineStatusLogout(userid);
        }
    }
}
