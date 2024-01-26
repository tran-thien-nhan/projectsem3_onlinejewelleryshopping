using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoldKrtMstController : ControllerBase
    {
        private readonly IGoldKrtMstRepo goldKrtMstRepo;

        public GoldKrtMstController(IGoldKrtMstRepo goldKrtMstRepo)
        {
            this.goldKrtMstRepo = goldKrtMstRepo;
        }

        [HttpGet]
        public async Task<CustomResult> GetAllGoldKrtMstsList()
        {
            return await goldKrtMstRepo.GetAllGoldKrtMst();
        }

        [HttpGet("getonegoldkrt/{id}")]
        public async Task<CustomResult> GetGoldKrtMstById(string id)
        {
            return await goldKrtMstRepo.GetGoldKrtMstById(id);
        }

        [HttpPost]
        public async Task<CustomResult> CreateGoldKrtMst([FromForm] GoldKrtMst goldKrtMst)
        {
            return await goldKrtMstRepo.CreateGoldKrtMst(goldKrtMst);
        }

        [HttpPut]
        public async Task<CustomResult> UpdateGoldKrtMst([FromForm] GoldKrtMst goldKrtMst)
        {
            return await goldKrtMstRepo.UpdateGoldKrtMst(goldKrtMst);
        }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteGoldKrtMst(string id)
        {
            return await goldKrtMstRepo.DeleteGoldKrtMst(id);
        }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateGoldKrtVisibility(string id)
        {
            return await goldKrtMstRepo.UpdateGoldKrtVisibility(id);
        }
    }
}
