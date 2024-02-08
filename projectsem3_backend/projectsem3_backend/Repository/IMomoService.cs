using projectsem3_backend.Models;
using projectsem3_backend.Models.Momo;

namespace projectsem3_backend.Repository
{
    public interface IMomoService
    {
        Task<MomoCustomResponse> CreatePaymentAsync(OrderMst model);
    }
}
