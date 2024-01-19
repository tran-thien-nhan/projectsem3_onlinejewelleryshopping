using projectsem3_backend.CustomStatusCode;

namespace projectsem3_backend.Repository
{
    public interface IItemMstRepo
    {
        Task<CustomResult> GetAllItemMst();
    }
}
