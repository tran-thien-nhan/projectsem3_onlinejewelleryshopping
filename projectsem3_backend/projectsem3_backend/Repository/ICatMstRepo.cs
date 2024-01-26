using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface ICatMstRepo
    {
        Task<CustomResult> GetAllCatMst();
        Task<CustomResult> GetCatMstById(string id);
        Task<CustomResult> CreateCatMst(CatMst catMst);
        Task<CustomResult> UpdateCatMst(CatMst catMst);
        Task<CustomResult> DeleteCatMst(string id);
        // updatevisibility
        Task<CustomResult> UpdateCatVisibility(string id);
    }
}
