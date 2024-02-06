using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface ICertifyMstRepo
    {
        Task<CustomResult> GetAllCertifyMst();
        Task<CustomResult> GetCertifyMstById(string id);
        Task<CustomResult> CreateCertifytMst(CertifyMst certifyMst);
        Task<CustomResult> UpdateCertifyMst(CertifyMst certifyMst);
        Task<CustomResult> DeleteCertifyMst(string id);
        // updatevisibility
        Task<CustomResult> UpdateCertifyVisibility(string id);
    }
}
