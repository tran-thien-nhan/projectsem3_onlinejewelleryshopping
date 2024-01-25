using Microsoft.AspNetCore.Http;
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

        [HttpGet("checklogin/{email}/{password}")]
        public async Task<CustomResult> CheckLogin(string email, string password)
        {
            return await userRepo.CheckLogin(email, password);
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
    }
}
