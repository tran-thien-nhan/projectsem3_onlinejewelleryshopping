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

        [HttpGet("getcartbyuserid/{userId}")]
        public async Task<CustomResult> GetAllCart(string userId)
        {
            return await cartRepo.GetCartByUserId(userId);
        }

        [HttpPost("addcart")]
        public async Task<CustomResult> CreateCart([FromForm] CartList cart)
        {
            return await cartRepo.CreateCart(cart);
        }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteCart(string id)
        {
            return await cartRepo.DeleteCart(id);
        }

        [HttpGet("getall")]
        public async Task<CustomResult> GetCarts()
        {
            return await cartRepo.GetCarts();
        }

        [HttpDelete("clearcart/{userId}")]
        public async Task<CustomResult> ClearCart(string userId)
        {
            return await cartRepo.ClearCart(userId);
        }

        [HttpPut("updatequantityincreament/{cartId}/{quantity}")]
        public async Task<CustomResult> UpdateQuantityIncreament(string cartId, int quantity)
        {
            return await cartRepo.UpdateQuantityIncreament(cartId, quantity);
        }

        [HttpPut("updatequantitydecreament/{cartId}/{quantity}")]
        public async Task<CustomResult> UpdateQuantityDecreament(string cartId, int quantity)
        {
            return await cartRepo.UpdateQuantityDecreament(cartId, quantity);
        }

        [HttpPut("updatequantity/{cartId}/{quantity}")]
        public async Task<CustomResult> UpdateQuantity(string cartId, int quantity)
        {
            return await cartRepo.UpdateQuantity(cartId, quantity);
        }

        [HttpGet("checkitemincart/{userId}/{styleCode}")]
        public async Task<CustomResult> CheckItemInCart(string userId, string styleCode)
        {
            return await cartRepo.CheckItemInCart(userId, styleCode);
        }
    }
}
