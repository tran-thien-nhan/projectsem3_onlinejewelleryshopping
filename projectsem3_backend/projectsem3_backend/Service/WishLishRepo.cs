using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class WishLishRepo : IWishListRepo
    {
        private readonly DatabaseContext db;

        public WishLishRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<CustomResult> AddWishList(Wishlist wishList)
        {
            try
            {
                if (await db.Wishlists.AnyAsync(i => i.Style_Code == wishList.Style_Code && i.UserID == wishList.UserID))
                {
                    return new CustomResult(201, "Item already exists in the wishlist", null);
                }
                wishList.WhistList_ID = Guid.NewGuid().ToString();
                await db.Wishlists.AddAsync(wishList);
                var result = await db.SaveChangesAsync();
                if (result == 1)
                {
                    return new CustomResult(200, "Create New WishList Success", wishList);
                }
                else
                {
                    return new CustomResult(201, "Create New WishList Error", null);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UnAddWishList(string wishlistId)
        {
            try
            {
                var wishList = await db.Wishlists.SingleOrDefaultAsync(w => w.WhistList_ID == wishlistId);
                if (wishList == null)
                {
                    return new CustomResult(404, "Not Found", null);
                }
                db.Wishlists.Remove(wishList);
                var result = await db.SaveChangesAsync();
                if (result == 1)
                {
                    return new CustomResult(200, "Delete WishList Success", wishList);
                }
                else
                {
                    return new CustomResult(201, "Delete WishList Error", null);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }
        public async Task<CustomResult> GetAllWishListByUser(string userId)
        {
            try
            {
                var data = await db.Wishlists.Where(i => i.UserID == userId).ToListAsync();
                return new CustomResult(200, "Success", data);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetAllWishList()
        {
            try
            {
                var data = await db.Wishlists
                        .Include(i => i.ItemMst)
                        .Include(i => i.UserRegMst)
                        .ToListAsync();

                return new CustomResult(200, "Success", data);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }
    }
}
