using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatMstController : ControllerBase
    {
        private readonly ICatMstRepo catMstRepo;

        public CatMstController(ICatMstRepo catMstRepo)
        {
            this.catMstRepo = catMstRepo;
        }

        [HttpGet]
        public async Task<CustomResult> GetAllCatMsts()
        {
            return await catMstRepo.GetAllCatMst();
        }

        [HttpGet("getonecategory/{id}")]
        public async Task<CustomResult> GetCatMstById(string id)
        {
            return await catMstRepo.GetCatMstById(id);
        }

        [HttpPost]
        public async Task<CustomResult> CreateCatMst([FromForm] CatMst catMst)
        {
            return await catMstRepo.CreateCatMst(catMst);
        }

        [HttpPut]
        public async Task<CustomResult> UpdateCatMst([FromForm] CatMst catMst)
        {
            return await catMstRepo.UpdateCatMst(catMst);
        }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteCatMst(string id)
        {
            return await catMstRepo.DeleteCatMst(id);
        }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateCatVisibility(string id)
        {
            return await catMstRepo.UpdateCatVisibility(id);
        }   
    }
}
