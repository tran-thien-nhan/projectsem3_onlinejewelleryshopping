using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
    {
    public interface IDimQltyMstRepo
        {
        Task<CustomResult> GetAllDimQltyMst();
        Task<CustomResult> GetDimQltyMstById( string id );
        Task<CustomResult> CreateDimQltyMst( DimQltyMst dimQltyMst );
        Task<CustomResult> UpdateDimQltyMst( DimQltyMst dimQltyMst );
        Task<CustomResult> DeleteDimQltyMst( string id );
        Task<CustomResult> UpdateVisibility( string id );
        }
    }
