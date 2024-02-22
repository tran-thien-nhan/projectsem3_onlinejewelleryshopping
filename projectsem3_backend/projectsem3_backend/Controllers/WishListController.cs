using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListController : ControllerBase
    {
        private readonly IWishListRepo wishListRepo;

        public WishListController(IWishListRepo wishListRepo)
        {
            this.wishListRepo = wishListRepo;
        }

        [HttpPost]
        public async Task<CustomResult> AddWishList(Wishlist wishList)
        {
            return await wishListRepo.AddWishList(wishList);
        }

        [HttpDelete("unaddfromwishlist/{wishlistId}")]
        public async Task<CustomResult> UnAddWishList(string wishlistId)
        {
            return await wishListRepo.UnAddWishList(wishlistId);
        }

        [HttpGet("getallwishlistbyuser/{userId}")]
        public async Task<CustomResult> GetAllWishListByUser(string userId)
        {
            return await wishListRepo.GetAllWishListByUser(userId);
        }

        [HttpGet("getallwishlist")]
        public async Task<CustomResult> GetAllWishList()
        {
            return await wishListRepo.GetAllWishList();
        }
    }
}
