using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemMstController : ControllerBase
    {
        private readonly IItemMstRepo itemMstRepo;
        private readonly IExcelHandler excelHandler;

        public ItemMstController(IItemMstRepo itemMstRepo, IExcelHandler excelHandler)
        {
            this.itemMstRepo = itemMstRepo;
            this.excelHandler = excelHandler;
        }

        [HttpGet]
        public async Task<CustomResult> GetAllItemMsts()
        {
            return await itemMstRepo.GetAllItemMst();
        }

        [HttpGet("getoneitem/{id}")]
        public async Task<CustomResult> GetItemMstById(string id)
        {
            return await itemMstRepo.GetItemMstById(id);
        }

        [HttpPost]
        public async Task<CustomResult> CreateItemMst([FromForm] ItemMst itemMst, IFormFile file)
        {
            return await itemMstRepo.CreateItemMst(itemMst, file);
        }

        [HttpPut]
        public async Task<CustomResult> UpdateItemMst([FromForm] ItemMst itemMst, IFormFile file)
        {
            return await itemMstRepo.UpdateItemMst(itemMst, file);
        }

        [HttpDelete("{id}")]
        public async Task<CustomResult> DeleteItemMst(string id)
        {
            return await itemMstRepo.DeleteItemMst(id);
        }

        [HttpPut("updatevisibility/{id}")]
        public async Task<CustomResult> UpdateVisibility(string id)
        {
            return await itemMstRepo.UpdateVisibility(id);
        }

        [HttpGet("getallitemsexcel")]
        public async Task<IActionResult> GetAllItemExcel()
        {
            try
            {
                var itemlist = await itemMstRepo.GetAllItemExcelReport();
                var excelStream = await excelHandler.ExportToExcel<ItemMst>(itemlist);
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.Headers.Add("Content-Disposition", $"attachment; filename=ItemReport_{DateTime.Now.Ticks}.xlsx");

                // Return the Excel as a file stream
                return File(excelStream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("checkquantity")]
        public async Task<CustomResult> CheckQuantity()
        {
            return await itemMstRepo.CheckQuantity();
        }
    }
}
