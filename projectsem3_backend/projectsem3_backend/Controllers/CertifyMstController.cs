using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertifyMstController : ControllerBase
    {
        private readonly ICertifyMstRepo certifyMstRepo;

        public CertifyMstController(ICertifyMstRepo certifyMstRepo)
        {
            this.certifyMstRepo = certifyMstRepo;
        }

        [HttpGet]
        public async Task<CustomResult> GetAllCertifyMst()
        {
            return await certifyMstRepo.GetAllCertifyMst();
        }

        [HttpGet("get_1_certification/{id}")]
        public async Task<CustomResult> GetCertifyMstById(string id)
        {
            return await certifyMstRepo.GetCertifyMstById(id);
        }

        [HttpPost]
        public async Task<CustomResult> CreateCertifyMst([FromForm] CertifyMst certifyMst)
        {
                return await certifyMstRepo.CreateCertifytMst(certifyMst);
        }

        [HttpPut]
        public async Task<CustomResult> UpdateCertifyMst([FromForm] CertifyMst certifyMst)
        {
            return await certifyMstRepo.UpdateCertifyMst(certifyMst);
        }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteCertifyMst(string id)
        {
            return await certifyMstRepo.DeleteCertifyMst(id);
        }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateCertifyVisibility(string id)
        {
            return await certifyMstRepo.UpdateCertifyVisibility(id);
        }
    }
}
