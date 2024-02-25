using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IInquiryRepo
    {
        Task<CustomResult> GetAllInquiries();
        Task<CustomResult> GetInquiryById(string id);
        Task<CustomResult> CreateInquiry(Inquiry inquiry);
        Task<CustomResult> DeleteInquiry(string id);
        Task<CustomResult> UpdateInquiryVisibility(string id);

        Task<CustomResult> ReplyInquiry(string id, string content);
    }
}
