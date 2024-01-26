using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IGoldKrtMstRepo
    {
        Task<CustomResult> GetAllGoldKrtMst();
        Task<CustomResult> GetGoldKrtMstById(string id);
        Task<CustomResult> CreateGoldKrtMst(GoldKrtMst goldKrtMst);
        Task<CustomResult> UpdateGoldKrtMst(GoldKrtMst goldKrtMst);
        Task<CustomResult> DeleteGoldKrtMst(string id);
        // updatevisibility
        Task<CustomResult> UpdateGoldKrtVisibility(string id);
    }
}
