using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IBrandMstRepo
    {
        Task<CustomResult> GetAllBrandMst();
        Task<CustomResult> GetBrandMstById(string id);
        Task<CustomResult> CreateBrandMst(BrandMst brandMst);
        Task<CustomResult> UpdateBrandMst(BrandMst brandMst);
        Task<CustomResult> DeleteBrandMst(string id);
        // updatevisibility
        Task<CustomResult> UpdateBrandVisibility(string id);
    }
}
