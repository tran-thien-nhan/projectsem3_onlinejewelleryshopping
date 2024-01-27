using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;
using System.Data;
using System.Text;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IOrderRepo orderRepo;
        private readonly IExcelHandler excelHandler;
        private readonly IUserRepo userRepo;
        private readonly IItemMstRepo itemMstRepo;

        public ReportController(IOrderRepo orderRepo, IExcelHandler excelHandler, IUserRepo userRepo, IItemMstRepo itemMstRepo)
        {
            this.orderRepo = orderRepo;
            this.excelHandler = excelHandler;
            this.userRepo = userRepo;
            this.itemMstRepo = itemMstRepo;
        }

        [HttpGet("exportonefileexcel")]
        public async Task<IActionResult> ExportOneFileExcel()
        {
            try
            {
                var orders = await orderRepo.GetAllOrderExcel();
                var orderDetails = await orderRepo.GetAllOrderDetailExcel();
                var users = await userRepo.GetAllUsersExcel();
                var itemlist = await itemMstRepo.GetAllItemExcelReport();

                var excelStream = new MemoryStream();

                using (var package = new ExcelPackage(excelStream))
                {
                    // Xuất danh sách đơn đặt hàng vào sheet "Orders"
                    var orderSheet = package.Workbook.Worksheets.Add("Orders");
                    await excelHandler.ExportToExcelMultiSheet(orders, orderSheet);

                    // Xuất danh sách chi tiết đơn đặt hàng vào sheet "OrderDetails"
                    var orderDetailSheet = package.Workbook.Worksheets.Add("OrderDetails");
                    await excelHandler.ExportToExcelMultiSheet(orderDetails, orderDetailSheet);

                    // Xuất danh sách người dùng vào sheet "Users"
                    var userSheet = package.Workbook.Worksheets.Add("Users");
                    await excelHandler.ExportToExcelMultiSheet(users, userSheet);

                    // Xuất danh sách sản phẩm vào sheet "Items"
                    var itemSheet = package.Workbook.Worksheets.Add("Items");
                    await excelHandler.ExportToExcelMultiSheet(itemlist, itemSheet);

                    await package.SaveAsync();
                    excelStream.Seek(0, SeekOrigin.Begin);
                }

                // Set appropriate content type and content disposition headers
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.Headers.Add("Content-Disposition", $"attachment; filename=AllData_{DateTime.Now.Ticks}.xlsx");

                // Return the combined Excel as a file stream
                return File(excelStream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }        
    }
}
