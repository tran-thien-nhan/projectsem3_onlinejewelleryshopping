using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepo cartRepo;

        public CartController(ICartRepo cartRepo)
        {
            this.cartRepo = cartRepo;
        }

        [HttpGet("{userid}")]
        public async Task<CustomResult> GetAllCart(string userId)
        {
            return await cartRepo.GetAllCart(userId);
        }

        [HttpPost]
        public async Task<CustomResult> CreateCart([FromForm] CartList cart)
        {
            return await cartRepo.CreateCart(cart);
        }

        [HttpPut("updatequantity/{cartid}")]
        public async Task<CustomResult> UpdateQuantity(string cartId, int quantity)
        {
            return await cartRepo.UpdateQuantity(cartId, quantity);
        }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteCart(string id)
        {
            return await cartRepo.DeleteCart(id);
        }
    }
}
