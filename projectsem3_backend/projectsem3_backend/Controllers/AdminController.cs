using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepo adminRepo;

        public AdminController(IAdminRepo adminRepo)
        {
            this.adminRepo = adminRepo;
        }

        [HttpGet]
        public async Task<CustomResult> GetAll()
        {
            return await adminRepo.GetAllAdmin();
        }

        [HttpPost]
        public async Task<CustomResult> CreateAdmin(AdminLoginMst admin)
        {
            return await adminRepo.CreateAdmin(admin);
        }

        [HttpGet("getone/{username}")]
        public async Task<CustomResult> GetOneAdmin(string username)
        {
            return await adminRepo.GetAdminByUsername(username);
        }

        [HttpDelete("delete/{username}")]
        public async Task<CustomResult> DeleteAdmin(string username)
        {
            return await adminRepo.DeleteAdmin(username);
        }

        [HttpPut("update/{username}")]
        public async Task<CustomResult> UpdateAdmin(string username, [FromForm] AdminLoginMst admin)
        {
            return await adminRepo.UpdateAdmin(username, admin);
        }

        [HttpGet("updateadminstatus/{username}")]
        public async Task<CustomResult> UpdateOnlineStatus(string username)
        {
            return await adminRepo.UpdateOnlineStatus(username);
        }
    }
}
