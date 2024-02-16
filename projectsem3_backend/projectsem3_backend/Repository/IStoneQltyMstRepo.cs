using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IStoneQltyMstRepo
    {
        Task<CustomResult> GetAllStoneQltyMst();
        Task<CustomResult> GetStoneQltyMst(string id);
        Task<CustomResult> CreateStoneQltyMst(StoneQltyMst stoneQltyMst);
        Task<CustomResult> UpdateStoneQltyMst(StoneQltyMst stoneQltyMst);

        Task<CustomResult> DeleteStoneQltyMst(string id);

        // updatevisibility
        Task<CustomResult> UpdateStoneQltyVisibility(string id);
    }
}
