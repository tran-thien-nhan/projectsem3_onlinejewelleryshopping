using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
    {
    public interface IDimQltySubMstRepo
        {
        Task<IEnumerable<DimQltySubMst>> GetAllDimQltySubMst();
        Task<CustomResult> GetDimQltySubMstById( string id );
        Task<CustomResult> CreateDimQltySubMst( DimQltySubMst dimQltySubMst );
        Task<CustomResult> UpdateDimQltySubMst( DimQltySubMst dimQltySubMst );
        Task<CustomResult> DeleteDimQltySubMst( string id );
        Task<CustomResult> UpdateVisibility( string id );
        }
    }
