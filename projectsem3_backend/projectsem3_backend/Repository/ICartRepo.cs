using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface ICartRepo
    {
        Task<CustomResult> GetCartByUserId(string userId);

        Task<CustomResult> GetCarts();
        Task<CustomResult> CreateCart(CartList cart);
        Task<CustomResult> UpdateQuantityIncreament(string id, int quantity);
        Task<CustomResult> UpdateQuantityDecreament(string id, int quantity);

        Task<CustomResult> UpdateQuantity(string id, int quantity);
        Task<CustomResult> DeleteCart(string id);

        //hàm clearcart
        Task<CustomResult> ClearCart(string userId);

        //check item trong cart
        Task<CustomResult> CheckItemInCart(string userId, string style_Code);
    }
}
