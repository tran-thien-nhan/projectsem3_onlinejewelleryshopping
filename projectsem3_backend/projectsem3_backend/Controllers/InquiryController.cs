using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;
using projectsem3_backend.Service;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InquiryController : ControllerBase
    {
        private readonly IInquiryRepo _inquiryRepo;

        public InquiryController(IInquiryRepo inquiryRepo)
        {
            _inquiryRepo = inquiryRepo;
        }

        [HttpGet]
        public async Task<CustomResult> GetAllInquiries()
        {
            return await _inquiryRepo.GetAllInquiries();
        }

        [HttpGet("{id}")]
        public async Task<CustomResult> GetInquiryById(string id)
        {
            return await _inquiryRepo.GetInquiryById(id);
        }

        [HttpPost("create")]
        public async Task<ActionResult<CustomResult>> CreateInquiry([FromBody] InquiryCreateRequest request)
        {
            try
            {
                if (request == null)
                {
                    return BadRequest(new CustomResult(400, "Invalid input. Request is null.", null));
                }

                var inquiry = new Inquiry
                {
                    ID = Guid.NewGuid().ToString(),
                    Name = request.Name,
                    City = request.City,
                    Contact = request.Contact,
                    EmailID = request.EmailID,
                    Comment = request.Comment,
                    Cdate = DateTime.Now,
                    Visible = true // You can set visibility as required
                };

                var result = await _inquiryRepo.CreateInquiry(inquiry);

                return Ok(result); // Trả về mã trạng thái 200 OK và kết quả
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new CustomResult(500, e.Message, null)); // Trả về lỗi 500 và thông điệp lỗi
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CustomResult>> DeleteInquiry(string id)
        {
            try
            {
                var result = await _inquiryRepo.DeleteInquiry(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new CustomResult(500, e.Message, null));
            }
        }

        [HttpPut("updatevisibility/{id}")]
        public async Task<ActionResult<CustomResult>> UpdateVisibility(string id)
        {
            try
            {
                var result = await _inquiryRepo.UpdateInquiryVisibility(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new CustomResult(500, e.Message, null));
            }
        }

        //reply inquiry
        [HttpPost("reply")]
        public async Task<CustomResult> ReplyToUser([FromBody] ReplyRequest request)
        {
            return await _inquiryRepo.ReplyInquiry(request.id, request.content);
        }
    }

    public class InquiryCreateRequest
    {
        public string Name { get; set; }
        public string City { get; set; }
        public string Contact { get; set; }
        public string EmailID { get; set; }
        public string Comment { get; set; }
    }

    public class ReplyRequest
    {
        public string id { get; set; }
        public string content { get; set; }
    }
}

