using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
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
    }
}
