using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
    {
    public interface IDimInfoMstRepo
        {
        Task<CustomResult> GetAllDimInfoMsts();
        Task<CustomResult> GetDimInfoMstById( string id );
        Task<CustomResult> CreateDimInfoMst( DimInfoMst dimInfoMst, IFormFile file );
        Task<CustomResult> UpdateDimInfoMst( DimInfoMst dimInfoMst, IFormFile file );
        Task<CustomResult> DeleteDimInfoMst( string id );
        Task<CustomResult> UpdateVisibility( string id );
        }
    }
