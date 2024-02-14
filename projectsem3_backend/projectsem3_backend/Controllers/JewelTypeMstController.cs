using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
    {
    [Route("api/[controller]")]
    [ApiController]
    public class JewelTypeMstController : ControllerBase
        {
        private readonly IJewelRepo _jewelTypeRepo;

        public JewelTypeMstController( IJewelRepo jewelTypeRepo )
            {
            _jewelTypeRepo = jewelTypeRepo;
            }

        [HttpGet]
        public async Task<CustomResult> GetAllJewelTypes()
            {
            return await _jewelTypeRepo.GetAllJewelTypes();
            }

        [HttpGet("{id}")]
        public async Task<CustomResult> GetJewelTypeById( string id )
            {
            return await _jewelTypeRepo.GetJewelTypeById(id);
            }

        [HttpPost]
        public async Task<CustomResult> CreateJewelType( [FromBody] JewelTypeMst jewelType )
            {
            return await _jewelTypeRepo.CreateJewelType(jewelType);
            }

        [HttpPut("{id}")]
        public async Task<CustomResult> UpdateJewelType( string id, [FromBody] JewelTypeMst jewelType )
            {
            jewelType.Jewellery_ID = id;
            return await _jewelTypeRepo.UpdateJewelType(jewelType);
            }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteJewelType( string id )
            {
            return await _jewelTypeRepo.DeleteJewelType(id);
            }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateVisibility( string id )
            {
            return await _jewelTypeRepo.UpdateVisibility(id);
            }
        }
    }
