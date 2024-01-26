using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoneQltyMstController : ControllerBase
    {
         private readonly IStoneQltyMstRepo stoneQltyMstRepo;
        
         public StoneQltyMstController(IStoneQltyMstRepo stoneQltyMstRepo)
         {
             this.stoneQltyMstRepo = stoneQltyMstRepo;
         }


        [HttpGet("getonestoneqlty/{id}")]
        public async Task<CustomResult> GetStoneQltyMst(string id)
        {
            return await stoneQltyMstRepo.GetStoneQltyMst(id);
        }
        
         [HttpPost]
         public async Task<CustomResult> CreateStoneQltyMst([FromForm] StoneQltyMst stoneQltyMst)
         {
             return await stoneQltyMstRepo.CreateStoneQltyMst(stoneQltyMst);
         }
        
         [HttpPut]
         public async Task<CustomResult> UpdateStoneQltyMst([FromForm] StoneQltyMst stoneQltyMst)
         {
             return await stoneQltyMstRepo.UpdateStoneQltyMst(stoneQltyMst);
         }
        
       
    }
}
