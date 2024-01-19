using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
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
    }
}
