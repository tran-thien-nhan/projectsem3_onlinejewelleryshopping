using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo userRepo;

        public UserController(IUserRepo userRepo)
        {
            this.userRepo = userRepo;
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
    }
}
