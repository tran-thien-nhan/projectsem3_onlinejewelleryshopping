using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandMstController : ControllerBase
    {
        private readonly IBrandMstRepo brandMstRepo;

        public BrandMstController(IBrandMstRepo brandMstRepo)
        {
            this.brandMstRepo = brandMstRepo;
        }

        [HttpGet]
        public async Task<CustomResult> GetAllBrandMsts()
        {
            return await brandMstRepo.GetAllBrandMst();
        }

        [HttpGet("getonebrand/{id}")]
        public async Task<CustomResult> GetBrandMstById(string id)
        {
            return await brandMstRepo.GetBrandMstById(id);
        }

        [HttpPost]
        public async Task<CustomResult> CreateBrandMst([FromForm] BrandMst brandMst)
        {
            return await brandMstRepo.CreateBrandMst(brandMst);
        }

        [HttpPut]
        public async Task<CustomResult> UpdateBrandMst([FromForm] BrandMst brandMst)
        {
            return await brandMstRepo.UpdateBrandMst(brandMst);
        }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteBrandMst(string id)
        {
            return await brandMstRepo.DeleteBrandMst(id);
        }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateBrandVisibility(string id)
        {
            return await brandMstRepo.UpdateBrandVisibility(id);
        }
    }
}
