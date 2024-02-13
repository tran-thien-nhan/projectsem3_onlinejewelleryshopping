using projectsem3_backend.CustomStatusCode;

namespace projectsem3_backend.Repository
{
    public interface IJewelRepo
    {
        Task<CustomResult> GetAll();
        Task<CustomResult> GetById(string id);
    }
}
