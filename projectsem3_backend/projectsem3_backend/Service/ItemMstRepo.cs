using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class ItemMstRepo : IItemMstRepo
    {
        private readonly DatabaseContext db;

        public ItemMstRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<CustomResult> GetAllItemMst()
        {
            try
            {
                var result = await db.ItemMsts.ToListAsync();
                if (result == null)
                {
                    return new CustomResult(401, "Something went wrong", null);
                }
                else if (result.Count == 0) // Sửa lại điều kiện kiểm tra độ dài của danh sách
                {
                    return new CustomResult(204, "List is empty", result); // Thay đổi mã trạng thái 201 thành 204 nếu danh sách trống rỗng
                }
                else
                {
                    return new CustomResult(200, "Get list success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }
    }
}
