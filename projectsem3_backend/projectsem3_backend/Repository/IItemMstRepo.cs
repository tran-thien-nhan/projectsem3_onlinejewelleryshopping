using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IItemMstRepo
    {
        Task<CustomResult> GetAllItemMst();
        Task<CustomResult> GetItemMstById(string id);
        Task<CustomResult> CreateItemMst(ItemMst itemMst, IFormFile file);
        Task<CustomResult> UpdateItemMst(ItemMst itemMst, IFormFile file);
        Task<CustomResult> DeleteItemMst(string id);
        // updatevisibility
        Task<CustomResult> UpdateVisibility(string id);
    }
}
