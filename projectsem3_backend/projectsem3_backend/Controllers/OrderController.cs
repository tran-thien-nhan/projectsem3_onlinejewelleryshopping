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

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepo orderRepo;
        private readonly IExcelHandler excelHandler;

        public OrderController(IOrderRepo orderRepo, IExcelHandler excelHandler)
        {
            this.orderRepo = orderRepo;
            this.excelHandler = excelHandler;
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

        [HttpPut("updateorderstatus/{id}/{status}")]
        public async Task<CustomResult> UpdateOrderStatus(string id, int status)
        {
            return await orderRepo.UpdateOrderStatus(id, status);
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
    }
}
