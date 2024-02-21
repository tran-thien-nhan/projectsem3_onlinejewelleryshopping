using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
    {
    public interface IDimMstRepo
        {
        Task<CustomResult> GetAllDimMstsAsync();
        Task<CustomResult> GetDimMstByIdAsync( string id );
        Task<CustomResult> CreateDimMstAsync( DimMst dimMst );
        Task<CustomResult> UpdateDimMstAsync( DimMst dimMst );
        Task<CustomResult> DeleteDimMstAsync( string dimId );
        Task<CustomResult> UpdateDimVisibility( string dimId );
        }
    }
