using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface ICartRepo
    {
        Task<CustomResult> GetAllCart(string userId);
        Task<CustomResult> CreateCart(CartList cart);
        Task<CustomResult> UpdateQuantity(string id, int quantity);
        Task<CustomResult> DeleteCart(string id);
    }
}
