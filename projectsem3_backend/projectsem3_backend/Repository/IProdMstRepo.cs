using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
    {
    public interface IProdMstRepo
        {
        Task<CustomResult> GetAllProdMsts();
        Task<CustomResult> GetProdMstById( string id );
        Task<CustomResult> CreateProdMst( ProdMst prodMst );
        Task<CustomResult> UpdateProdMst( ProdMst prodMst );
        Task<CustomResult> DeleteProdMst( string id );
        Task<CustomResult> UpdateVisibility( string id );
        }
    }
