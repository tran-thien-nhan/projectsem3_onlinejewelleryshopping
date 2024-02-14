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
    public class DimQltyMstController : ControllerBase
        {
        private readonly IDimQltyMstRepo _dimQltyMstRepo;

        public DimQltyMstController( IDimQltyMstRepo dimQltyMstRepo )
            {
            _dimQltyMstRepo = dimQltyMstRepo;
            }

        [HttpGet]
        public async Task<CustomResult> GetAllDimQltyMsts()
            {
            return await _dimQltyMstRepo.GetAllDimQltyMst();
            }

        [HttpGet("getonedimqlty/{id}")]
        public async Task<CustomResult> GetDimQltyMstById( string id )
            {
            return await _dimQltyMstRepo.GetDimQltyMstById(id);
            }

        [HttpPost]
        public async Task<CustomResult> CreateDimQltyMst( [FromBody] DimQltyMst dimQltyMst )
            {
            return await _dimQltyMstRepo.CreateDimQltyMst(dimQltyMst);
            }

        [HttpPut("{id}")]
        public async Task<CustomResult> UpdateDimQltyMst( string id, [FromBody] DimQltyMst dimQltyMst )
            {
            dimQltyMst.DimQlty_ID = id;
            return await _dimQltyMstRepo.UpdateDimQltyMst(dimQltyMst);
            }


        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteDimQltyMst( string id )
            {
            return await _dimQltyMstRepo.DeleteDimQltyMst(id);
            }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateVisibility( string id )
            {
            return await _dimQltyMstRepo.UpdateVisibility(id);
            }
        }
    }
