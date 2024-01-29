﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
    {
    [Route("api/[controller]")]
    [ApiController]
    public class DimQltySubMstController : ControllerBase
        {
        private readonly IDimQltySubMstRepo _dimQltySubMstRepo;

        public DimQltySubMstController( IDimQltySubMstRepo dimQltySubMstRepo )
            {
            _dimQltySubMstRepo = dimQltySubMstRepo;
            }

        [HttpGet]
        public async Task<IEnumerable<DimQltySubMst>> GetAllDimQltySubMsts()
            {
            return await _dimQltySubMstRepo.GetAllDimQltySubMst();
            }

        [HttpGet("getonedimqltysub/{id}")]
        public async Task<CustomResult> GetDimQltySubMstById( string id )
            {
            return await _dimQltySubMstRepo.GetDimQltySubMstById(id);
            }

        [HttpPost]
        public async Task<CustomResult> CreateDimQltySubMst( [FromBody] DimQltySubMst dimQltySubMst )
            {
            return await _dimQltySubMstRepo.CreateDimQltySubMst(dimQltySubMst);
            }

        [HttpPut]
        public async Task<CustomResult> UpdateDimQltySubMst( [FromBody] DimQltySubMst dimQltySubMst )
            {
            return await _dimQltySubMstRepo.UpdateDimQltySubMst(dimQltySubMst);
            }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteDimQltySubMst( string id )
            {
            return await _dimQltySubMstRepo.DeleteDimQltySubMst(id);
            }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateVisibility( string id )
            {
            return await _dimQltySubMstRepo.UpdateVisibility(id);
            }
        }
    }
