using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IStoneMstRepo
    {
        Task<CustomResult> GetAllStoneMst();
        Task<CustomResult> GetStoneMstById(string id);
        Task<CustomResult> CreateStoneMst(StoneMst stoneMst);
        Task<CustomResult> UpdateStoneMst(StoneMst stoneMst);
        Task<CustomResult> DeleteStoneMst(string id);
        // updatevisibility
        Task<CustomResult> UpdateStoneVisibility(string id);
    }
}
