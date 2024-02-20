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

        Task<List<ItemMst>> GetAllItemExcelReport();

        //tạo hàm tự động duyệt qua tất cả item hiện đang có và kiểm tra nếu cái nào có quantity <= 10 thì sẽ tự động thông báo
        Task<CustomResult> CheckQuantity();

        Task<CustomResult> GetAllItemWithDim();
    }
}
