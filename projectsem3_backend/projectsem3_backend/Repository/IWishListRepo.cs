using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IWishListRepo
    {
        Task<CustomResult> AddWishList(Wishlist wishList);

        //unadd item from wishlist
        Task<CustomResult> UnAddWishList(string wishlistId);

        //get all wishlist by user
        Task<CustomResult> GetAllWishListByUser(string userId);

        //get all wishlist
        Task<CustomResult> GetAllWishList();
    }
}
