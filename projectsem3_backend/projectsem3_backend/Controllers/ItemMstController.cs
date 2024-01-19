using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemMstController : ControllerBase
    {
        private readonly IItemMstRepo itemMstRepo;

        public ItemMstController(IItemMstRepo itemMstRepo)
        {
            this.itemMstRepo = itemMstRepo;
        }

        [HttpGet]
        public async Task<CustomResult> GetAllItemMsts()
        {
            return await itemMstRepo.GetAllItemMst();
        }

        [HttpGet("getoneitem/{id}")]
        public async Task<CustomResult> GetItemMstById(string id)
        {
            return await itemMstRepo.GetItemMstById(id);
        }

        [HttpPost]
        public async Task<CustomResult> CreateItemMst([FromForm] ItemMst itemMst, IFormFile file)
        {
            return await itemMstRepo.CreateItemMst(itemMst, file);
        }

        [HttpPut]
        public async Task<CustomResult> UpdateItemMst([FromForm] ItemMst itemMst, IFormFile file)
        {
            return await itemMstRepo.UpdateItemMst(itemMst, file);
        }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteItemMst(string id)
        {
            return await itemMstRepo.DeleteItemMst(id);
        }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateVisibility(string id)
        {
            return await itemMstRepo.UpdateVisibility(id);
        }
    }
}
