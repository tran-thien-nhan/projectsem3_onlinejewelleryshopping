using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class CartRepo : ICartRepo
    {
        private readonly DatabaseContext db;

        public CartRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<CustomResult> ClearCart(string userId)
        {
            try
            {
                var cart = await db.CartLists.Where(c => c.UserID == userId).ToListAsync();
                if (cart == null)
                {
                    return new CustomResult(404, "Cart not found", null);
                }
                else
                {
                    db.CartLists.RemoveRange(cart);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Delete cart successfully!", cart);
                    }
                    else
                    {
                        return new CustomResult(500, "Delete cart failed!", null);
                    }
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> CreateCart(CartList cart)
        {
            try
            {
                var oldCart = await db.CartLists.SingleOrDefaultAsync(c => c.UserID == cart.UserID && c.Style_Code == cart.Style_Code);
                if (oldCart != null)
                {
                    // Kiểm tra sự tồn tại
                    var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == cart.Style_Code);
                    var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == cart.UserID);

                    //kiểm tra
                    if (item == null || user == null)
                    {
                        return new CustomResult(500, "Add to cart failed! Item or user not found.", null);
                    }

                    //gán
                    cart.ItemMst = item;
                    cart.UserRegMst = user;

                    oldCart.Quantity += cart.Quantity;

                    if (oldCart.Quantity < 0)
                    {
                        return new CustomResult(500, "Add to cart failed! Invalid quantity.", null);
                    }

                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Add to cart successfully!", oldCart);
                    }
                    else
                    {
                        return new CustomResult(500, "Add to cart failed!", null);
                    }
                }
                else
                {
                    cart.ID = Guid.NewGuid().ToString();

                    // Kiểm tra sự tồn tại
                    var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == cart.Style_Code);
                    var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == cart.UserID);

                    //kiểm tra
                    if (item == null || user == null)
                    {
                        return new CustomResult(500, "Add to cart failed! Item or user not found.", null);
                    }

                    //gán
                    cart.ItemMst = item;
                    cart.UserRegMst = user;

                    await db.CartLists.AddAsync(cart);
                    var result = await db.SaveChangesAsync();

                    if (result == 1)
                    {
                        return new CustomResult(200, "Add to cart successfully!", cart);
                    }
                    else
                    {
                        return new CustomResult(500, "Add to cart failed!", null);
                    }
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> DeleteCart(string id)
        {
            try
            {
                var cart = await db.CartLists.SingleOrDefaultAsync(c => c.ID == id);
                if (cart == null)
                {
                    return new CustomResult(404, "Cart not found", null);
                }
                else
                {
                    db.CartLists.Remove(cart);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Delete cart successfully!", cart);
                    }
                    else
                    {
                        return new CustomResult(500, "Delete cart failed!", null);
                    }
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetCartByUserId(string userId)
        {
            try
            {
                var cart = await db.CartLists.Include(c => c.ItemMst).Where(c => c.UserID == userId).ToListAsync();
                if (cart == null)
                {
                    return new CustomResult(404, "Cart not found", null);
                }
                else
                {
                    return new CustomResult(200, "Get all cart successfully!", cart);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }   
        }

        public async Task<CustomResult> GetCarts()
        {
            try
            {
                var cart = await db.CartLists.ToListAsync();
                if (cart == null)
                {
                    return new CustomResult(404, "Cart not found", null);
                }
                else
                {
                    return new CustomResult(200, "Get all cart successfully!", cart);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateQuantity(string id, int quantity)
        {
            try
            {
                CartList? cart = await db.CartLists.SingleOrDefaultAsync(c => c.ID == id);
                if (cart == null)
                {
                    return new CustomResult(404, "Cart not found", null);
                }

                // Kiểm tra sự tồn tại
                var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == cart.Style_Code);
                var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == cart.UserID);

                //kiểm tra
                if (item == null || user == null)
                {
                    return new CustomResult(500, "Add to cart failed! Item or user not found.", null);
                }

                //gán
                cart.ItemMst = item;
                cart.UserRegMst = user;

                cart.Quantity = quantity;

                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "update quantity successsfully!", cart);
                }
                else
                {
                    return new CustomResult(500, "update quantity failed!", null);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateQuantityDecreament(string id, int quantity)
        {
            try
            {
                CartList? cart = await db.CartLists.SingleOrDefaultAsync(c => c.ID == id);
                if (cart == null)
                {
                    return new CustomResult(404, "Cart not found", null);
                }

                // Kiểm tra sự tồn tại
                var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == cart.Style_Code);
                var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == cart.UserID);

                //kiểm tra
                if (item == null || user == null)
                {
                    return new CustomResult(500, "Add to cart failed! Item or user not found.", null);
                }

                //gán
                cart.ItemMst = item;
                cart.UserRegMst = user;

                cart.Quantity -= quantity;

                if (cart.Quantity < 0)
                {
                    cart.Quantity = 0;
                    return new CustomResult(500, "Cannot decrease more !", null);
                }

                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "update quantity successsfully!", cart);
                }
                else
                {
                    return new CustomResult(500, "update quantity failed!", null);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateQuantityIncreament(string id, int quantity)
        {
            try
            {
                CartList? cart = await db.CartLists.SingleOrDefaultAsync(c => c.ID == id);
                if (cart == null)
                {
                    return new CustomResult(404, "Cart not found", null);
                }

                // Kiểm tra sự tồn tại
                var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == cart.Style_Code);
                var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == cart.UserID);

                //kiểm tra
                if (item == null || user == null)
                {
                    return new CustomResult(500, "Add to cart failed! Item or user not found.", null);
                }

                //gán
                cart.ItemMst = item;
                cart.UserRegMst = user;

                cart.Quantity += quantity;

                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "update quantity successsfully!", cart);
                }
                else
                {
                    return new CustomResult(500, "update quantity failed!", null);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }
    }
}
