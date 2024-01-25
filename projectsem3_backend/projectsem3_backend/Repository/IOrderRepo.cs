using Microsoft.AspNetCore.Mvc;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.Models;

namespace projectsem3_backend.Repository
{
    public interface IOrderRepo
    {
        Task<CustomResult> GetOrders();
        Task<CustomResult> GetOrderById(string id);
        Task<CustomResult> GetOrderByUserId(string userId);
        Task<CustomResult> CreateOrder(OrderMst order);
        Task<CustomResult> UpdateOrder(OrderMst order);
        Task<CustomResult> DeleteOrder(string id);
        Task<CustomResult> UpdateOrderStatus(string id, int status);

        //get orderdetail
        Task<CustomResult> GetOrderDetail(string orderId);

        //xuất pdf
        Task<MemoryStream> ExportPDFOrderDetails(string orderId);

        //get all ordderdetail
        Task<List<OrderMst>> GetAllOrder();

        //get all order detail excel
        Task<List<OrderDetailMst>> GetAllOrderDetailExcel();
    }
}
