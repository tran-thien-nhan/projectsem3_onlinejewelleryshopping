using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;
using System.Net.Mime;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using projectsem3_backend.Service;
using OfficeOpenXml;
using projectsem3_backend.Models.Momo;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepo orderRepo;
        private readonly IExcelHandler excelHandler;
        private readonly IMomoService momoService;

        public OrderController(IOrderRepo orderRepo, IExcelHandler excelHandler, IMomoService momoService)
        {
            this.orderRepo = orderRepo;
            this.excelHandler = excelHandler;
            this.momoService = momoService;
        }

        [HttpGet("getall")]
        public async Task<CustomResult> GetOrders()
        {
            return await orderRepo.GetOrders();
        }

        [HttpGet("getorderbyid/{id}")]
        public async Task<CustomResult> GetOrderById(string id)
        {
            return await orderRepo.GetOrderById(id);
        }

        [HttpGet("getorderbyuserid/{userId}")]
        public async Task<CustomResult> GetOrderByUserId(string userId)
        {
            return await orderRepo.GetOrderByUserId(userId);
        }

        [HttpGet("checkquantity/{userid}")]
        public async Task<int> CheckQuantity(string userid)
        {
            return await orderRepo.CheckQuantity(userid);
        }

        [HttpPut("updatecartgetallquantity/{userid}")]
        public async Task<CustomResult> UpdateCartGetAllQuantity(string userid)
        {
            return await orderRepo.UpdateCartGetAllQuantity(userid);
        }

        [HttpPost("createmomopayment")]
        public async Task<CustomResult> CreateMomoPayment([FromBody] OrderMst model)
        {
            var response = await momoService.CreatePaymentAsync(model);
            return new CustomResult(200, "success", response);
        }

        [HttpPost("createorder")]
        public async Task<CustomResult> CreateOrder([FromBody] OrderMst order)
        {
            return await orderRepo.CreateOrder(order);
        }

        [HttpPut("updateorder")]
        public async Task<CustomResult> UpdateOrder([FromForm] OrderMst order)
        {
            return await orderRepo.UpdateOrder(order);
        }

        [HttpDelete("deleteorder/{id}")]
        public async Task<CustomResult> DeleteOrder(string id)
        {
            return await orderRepo.DeleteOrder(id);
        }

        [HttpPut("updateorderstatus/{orderid}/{status}")]
        public async Task<CustomResult> UpdateOrderStatus(string orderid, int status)
        {
            return await orderRepo.UpdateOrderStatus(orderid, status);
        }

        [HttpGet("getorderdetail/{orderId}")]
        public async Task<CustomResult> GetOrderDetail(string orderId)
        {
            return await orderRepo.GetOrderDetail(orderId);
        }

        [HttpGet("exportpdforderdetails/{orderId}")]
        public async Task<IActionResult> ExportPDFOrderDetails(string orderId)
        {
            try
            {
                // Generate the PDF content
                var pdfStream = await orderRepo.ExportPDFOrderDetails(orderId);

                // Set appropriate content type and content disposition headers
                Response.ContentType = MediaTypeNames.Application.Pdf;
                Response.Headers.Add("Content-Disposition", $"attachment; filename=Order_{orderId}.pdf");

                // Return the PDF as a file stream
                return File(pdfStream.ToArray(), "application/pdf");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("exportexcelorders")]
        public async Task<IActionResult> ExportExcelOrderDetailsReport()
        {
            try
            {
                var orders = await orderRepo.GetAllOrderExcel();
                // Generate the Excel content using IExcelHandler
                var excelStream = await excelHandler.ExportToExcel<OrderMst>(orders);

                // Set appropriate content type and content disposition headers
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.Headers.Add("Content-Disposition", $"attachment; filename=Order_{DateTime.Now.Ticks}.xlsx");

                // Return the Excel as a file stream
                return File(excelStream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("exportexcelorderdetails")]
        public async Task<IActionResult> ExportExcelOrderDetails()
        {
            try
            {
                var orderDetails = await orderRepo.GetAllOrderDetailExcel();
                // Generate the Excel content using IExcelHandler
                var excelStream = await excelHandler.ExportToExcel<OrderDetailMst>(orderDetails);

                // Set appropriate content type and content disposition headers
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.Headers.Add("Content-Disposition", $"attachment; filename=OrderDetail_{DateTime.Now.Ticks}.xlsx");

                // Return the Excel as a file stream
                return File(excelStream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("gettotalmoney")]
        public async Task<CustomResult> GetTotalMoney()
        {
            return await orderRepo.GetTotalMoney();
        }

        [HttpPut("cancelorder/{orderId}/{cancelreason}")]
        public async Task<CustomResult> CancelOrder(string orderId, string cancelreason)
        {
            return await orderRepo.CancelOrder(orderId, cancelreason);
        }
    }
}
