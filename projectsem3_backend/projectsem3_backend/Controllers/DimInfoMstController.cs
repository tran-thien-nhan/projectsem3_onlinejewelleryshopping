using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;
using projectsem3_backend.Service;

namespace projectsem3_backend.Controllers
    {
    [Route("api/[controller]")]
    [ApiController]
    public class DimInfoMstController : ControllerBase
        {
        private readonly IDimInfoMstRepo dimInfoMstRepo;

        public DimInfoMstController( IDimInfoMstRepo dimInfoMstRepo )
            {
            this.dimInfoMstRepo = dimInfoMstRepo;
            }

        [HttpGet]
        public async Task<ActionResult<CustomResult>> GetAllDimInfoMsts()
            {
            return await dimInfoMstRepo.GetAllDimInfoMsts();
            }

        [HttpGet("getonediminfo/{id}")]
        public async Task<ActionResult<CustomResult>> GetDimInfoMstById( string id )
            {
            return await dimInfoMstRepo.GetDimInfoMstById(id);
            }

        [HttpPost]
        public async Task<ActionResult<CustomResult>> CreateDimInfoMst( [FromForm] DimInfoMst dimInfoMst, IFormFile file )
            {
            return await dimInfoMstRepo.CreateDimInfoMst(dimInfoMst, file);
            }
        [HttpPut]
        public async Task<CustomResult> UpdateDimInfoMst( [FromForm] DimInfoMst dimInfoMst, IFormFile? file )
            {
            // Assuming dimInfoMst has the DimID property
            return await dimInfoMstRepo.UpdateDimInfoMst(dimInfoMst, file);
            }



        [HttpDelete("{id}")]
        public async Task<ActionResult<CustomResult>> DeleteDimInfoMst( string id )
            {
            return await dimInfoMstRepo.DeleteDimInfoMst(id);
            }

        [HttpPut("updatevisibility/{id}")]
        public async Task<ActionResult<CustomResult>> UpdateVisibility( string id )
            {
            return await dimInfoMstRepo.UpdateVisibility(id);
            }
        }
    }
