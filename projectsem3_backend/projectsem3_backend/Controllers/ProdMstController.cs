using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdMstController : ControllerBase
    {
        private readonly IProdMstRepo _proMstRepo;

        public ProdMstController(IProdMstRepo proMstRepo)
        {
            _proMstRepo = proMstRepo;
        }

        [HttpGet]
        public async Task<CustomResult> GetAllProMsts()
        {
            return await _proMstRepo.GetAllProdMsts();
        }

        [HttpGet("getonepro/{id}")]
        public async Task<CustomResult> GetProMstById(string id)
        {
            return await _proMstRepo.GetProdMstById(id);
        }

        [HttpPost]
        public async Task<CustomResult> CreateProMst([FromBody] ProdMst prodMst)
        {
            return await _proMstRepo.CreateProdMst(prodMst);
        }

        [HttpPut]
        public async Task<CustomResult> UpdateProMst([FromBody] ProdMst prodMst)
        {
            return await _proMstRepo.UpdateProdMst(prodMst);
        }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteProMst(string id)
        {
            return await _proMstRepo.DeleteProdMst(id);
        }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateVisibility(string id)
        {
            return await _proMstRepo.UpdateVisibility(id);
        }
    }
}
