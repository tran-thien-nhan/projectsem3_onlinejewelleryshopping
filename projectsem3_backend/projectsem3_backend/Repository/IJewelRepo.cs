using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IJewelRepo
    {
        Task<CustomResult> GetAllJewelTypes();
        Task<CustomResult> GetJewelTypeById( string id );
        Task<CustomResult> CreateJewelType( JewelTypeMst jewelType );
        Task<CustomResult> UpdateJewelType( JewelTypeMst jewelType );
        Task<CustomResult> DeleteJewelType( string id );
        Task<CustomResult> UpdateVisibility( string id );
        }
}
