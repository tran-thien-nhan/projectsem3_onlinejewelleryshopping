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

        public async Task<CustomResult> CreateCart(CartList cart)
        {
            try
            {
                var oldCart = await db.CartLists.SingleOrDefaultAsync(c => c.UserID == cart.UserID && c.Style_Code == cart.Style_Code);
                if (oldCart != null)
                {
                    oldCart.Quantity += cart.Quantity;
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
                    db.CartLists.Add(cart);
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

        public async Task<CustomResult> GetAllCart(string userId)
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

        public async Task<CustomResult> UpdateQuantity(string id, int quantity)
        {
            try
            {
                CartList? cart = await db.CartLists.SingleOrDefaultAsync(c => c.ID == id);
                if (cart == null)
                {
                    return new CustomResult(404, "Cart not found", null);
                }

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
