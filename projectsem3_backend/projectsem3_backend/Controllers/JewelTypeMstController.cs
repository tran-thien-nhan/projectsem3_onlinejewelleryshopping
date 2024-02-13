using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelTypeMstController : ControllerBase
    {
        private readonly IJewelRepo jewelRepo;

        public JewelTypeMstController(IJewelRepo jewelRepo)
        {
            this.jewelRepo = jewelRepo;
        }

        [HttpGet]
        public async Task<CustomResult> GetAll()
        {
            return await jewelRepo.GetAll();
        }

        [HttpGet("getbyid/{id}")]
        public async Task<CustomResult> GetById(string id)
        {
            return await jewelRepo.GetById(id);
        }
    }
}
