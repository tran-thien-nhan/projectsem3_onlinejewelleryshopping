using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
    {
    [Route("api/[controller]")]
    [ApiController]
    public class DimMstController : ControllerBase
        {
        private readonly IDimMstRepo dimMstRepo;

        public DimMstController( IDimMstRepo dimMstRepo )
            {
            this.dimMstRepo = dimMstRepo;
            }

        [HttpGet]
        public async Task<CustomResult> GetAllDimMsts()
            {
            return await dimMstRepo.GetAllDimMstsAsync();
            }

        [HttpGet("getonedim/{id}")]
        public async Task<CustomResult> GetDimMstById( string id )
            {
            return await dimMstRepo.GetDimMstByIdAsync(id);
            }

        [HttpPost]
        public async Task<CustomResult> CreateDimMst( [FromForm] DimMst dimMst )
            {
            return await dimMstRepo.CreateDimMstAsync(dimMst);
            }

        [HttpPut]
        public async Task<CustomResult> UpdateDimMst( [FromForm] DimMst dimMst )
            {
            return await dimMstRepo.UpdateDimMstAsync(dimMst);
            }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteDimMst( string id )
            {
            return await dimMstRepo.DeleteDimMstAsync(id);
            }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateDimVisibility( string id )
            {
            return await dimMstRepo.UpdateDimVisibility(id);
            }
        }
    }
