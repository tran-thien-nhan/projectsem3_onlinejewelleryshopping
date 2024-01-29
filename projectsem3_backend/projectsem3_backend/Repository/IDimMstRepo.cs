using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
    {
    public interface IDimMstRepo
        {
        Task<CustomResult> GetAllDimMstsAsync();
        Task<CustomResult> GetDimMstByIdAsync( string dimId );
        Task<CustomResult> CreateDimMstAsync( DimMst dimMst );
        Task<CustomResult> UpdateDimMstAsync( DimMst dimMst );
        Task<CustomResult> DeleteDimMstAsync( string dimId );
        Task<CustomResult> UpdateVisibility( string dimId );

        // Additional methods if needed
        Task<CustomResult> GetDimMstsByStyleCodeAsync( string styleCode );
        Task<CustomResult> GetDimMstsByDimQltyIdAsync( string dimQltyId );
        Task<CustomResult> GetDimMstsByDimSubTypeIdAsync( string dimSubTypeId );
        Task<CustomResult> GetDimMstsByCreatedAtRangeAsync( DateTime startDate, DateTime endDate );
        Task<CustomResult> GetVisibleDimMstsAsync();
        }
    }
