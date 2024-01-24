using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoneMstController : ControllerBase
    {
        private readonly IStoneMstRepo stoneMstRepo;

        public StoneMstController(IStoneMstRepo stoneMstRepo)
        {
            this.stoneMstRepo = stoneMstRepo;
        }

        [HttpGet]
        public async Task<CustomResult> GetAllStoneMsts()
        {
            return await stoneMstRepo.GetAllStoneMst();
        }

        [HttpGet("getonestone/{id}")]
        public async Task<CustomResult> GetStoneMstById(string id)
        {
            return await stoneMstRepo.GetStoneMstById(id);
        }

        [HttpPost]
        public async Task<CustomResult> CreateStoneMst([FromForm] StoneMst stoneMst)
        {
            return await stoneMstRepo.CreateStoneMst(stoneMst);
        }

        [HttpPut]
        public async Task<CustomResult> UpdateStoneMst([FromForm] StoneMst stoneMst)
        {
            return await stoneMstRepo.UpdateStoneMst(stoneMst);
        }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteStoneMst(string id)
        {
            return await stoneMstRepo.DeleteStoneMst(id);
        }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateStoneVisibility(string id)
        {
            return await stoneMstRepo.UpdateStoneVisibility(id);
        }
    }
}
