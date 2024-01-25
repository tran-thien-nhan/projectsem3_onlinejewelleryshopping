using iText.Kernel.Pdf;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System.Text;
using System.Net;

namespace projectsem3_backend.Service
{
    public class OrderRepo : IOrderRepo
    {
        private readonly DatabaseContext db;
        private readonly EmailService emailService;

        public OrderRepo(DatabaseContext db, EmailService emailService)
        {
            this.db = db;
            this.emailService = emailService;
        }

        public async Task<CustomResult> CreateOrder(OrderMst order)
        {
            using (var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    order.Order_ID = Guid.NewGuid().ToString();

                    // Lấy listCart của user dựa vào userId
                    var listCart = await db.CartLists.Include(c => c.ItemMst).Where(c => c.UserID == order.UserID).ToListAsync();

                    order.OrderDetailMsts = new List<OrderDetailMst>();

                    if (listCart == null || listCart.Count == 0)
                    {
                        transaction.Rollback();
                        return new CustomResult(404, "Cart empty", null);
                    }

                    // Lấy listCart và gán OrderDetail của order
                    foreach (var item in listCart)
                    {
                        var orderDetail = new OrderDetailMst
                        {
                            Style_Code = item.Style_Code,
                            Product_Name = item.Product_Name,
                            Quantity = item.Quantity,
                            MRP = item.MRP,
                            OrderMst = order
                        };

                        order.OrderDetailMsts.Add(orderDetail);
                    }

                    // Kiểm tra sự tồn tại của user
                    var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == order.UserID);

                    // Gán thông tin order
                    order.UserRegMst = user;
                    order.OrderStatus = 1;
                    order.TotalPrice = listCart.Sum(c => c.MRP * c.Quantity);
                    order.OrderDate = DateTime.Now;

                    // Tạo order
                    db.OrderMsts.Add(order);

                    // Trừ đi số lượng hiện tại trong bảng ItemMst
                    foreach (var item in listCart)
                    {
                        var oldItem = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == item.Style_Code);
                        if (oldItem != null)
                        {
                            oldItem.Quantity -= item.Quantity;
                            db.ItemMsts.Update(oldItem);
                        }
                    }

                    // Xóa cart
                    foreach (var cart in listCart)
                    {
                        db.CartLists.Remove(cart);
                    }

                    // Lưu vào db
                    var result = await db.SaveChangesAsync();

                    var userid = order.UserID;
                    var user1 = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == userid);
                    var userEmail = user1.EmailID;
                    var orderDetailList = await db.OrderDetailMsts.Include(o => o.ItemMst).Include(o => o.OrderMst).Where(o => o.Order_ID == order.Order_ID).ToListAsync();

                    // Gửi email xác nhận đơn hàng
                    await emailService.SendEmailConfirmationAsync(userEmail, order.Order_ID, orderDetailList);

                    transaction.Commit(); // Dừng transaction

                    if (result != 1)
                    {
                        return new CustomResult(200, "Create order successfully!", order);
                    }
                    else
                    {
                        return new CustomResult(500, "Create order failed!", null);
                    }
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return new CustomResult(500, ex.Message, null);
                }
            }
        }


        //ko sd
        public async Task<CustomResult> DeleteOrder(string id)
        {
            try
            {
                var order = await db.OrderMsts.SingleOrDefaultAsync(o => o.Order_ID == id);
                if (order == null)
                {
                    return new CustomResult(404, "Order not found!", null);
                }
                else
                {
                    db.OrderMsts.Remove(order);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Delete order successfully!", order);
                    }
                    else
                    {
                        return new CustomResult(500, "Delete order failed!", null);
                    }
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> GetOrderById(string id)
        {
            try
            {
                var order = await db.OrderMsts.SingleOrDefaultAsync(o => o.Order_ID == id);
                if (order == null)
                {
                    return new CustomResult(404, "Order not found!", null);
                }
                else
                {
                    return new CustomResult(200, "Get order successfully!", order);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> GetOrderByUserId(string userId)
        {
            try
            {
                var order = await db.OrderMsts.Include(o => o.UserRegMst).Where(o => o.UserID == userId).ToListAsync();
                if (order == null)
                {
                    return new CustomResult(404, "Order not found!", null);
                }
                else
                {
                    return new CustomResult(200, "Get order successfully!", order);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> GetOrderDetail(string orderId)
        {
            try
            {
                var orderDetail = await db.OrderMsts.Include(o => o.OrderDetailMsts).ThenInclude(o => o.ItemMst).SingleOrDefaultAsync(o => o.Order_ID == orderId);
                if (orderDetail == null)
                {
                    return new CustomResult(404, "Order detail not found!", null);
                }
                else
                {
                    return new CustomResult(200, "Get order detail successfully!", orderDetail);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> GetOrders()
        {
            try
            {
                var order = await db.OrderMsts.ToListAsync();
                if (order == null)
                {
                    return new CustomResult(404, "Order not found!", null);
                }
                else
                {
                    return new CustomResult(200, "Get order successfully!", order);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        //ko sd
        public async Task<CustomResult> UpdateOrder(OrderMst order)
        {
            try
            {
                var oldOrder = await db.OrderMsts.SingleOrDefaultAsync(o => o.Order_ID == order.Order_ID);
                if (oldOrder == null)
                {
                    return new CustomResult(404, "Order not found!", null);
                }
                else
                {
                    // Kiểm tra sự tồn tại
                    var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == order.UserID);

                    //kiểm tra
                    if (user == null)
                    {
                        return new CustomResult(500, "Add to cart failed! user not found.", null);
                    }

                    //gán                    
                    order.UserRegMst = user;

                    //update thủ công
                    oldOrder.Order_Note = order.Order_Note;
                    oldOrder.Order_Address = order.Order_Address;
                    oldOrder.OrderDate = DateTime.Now;

                    db.OrderMsts.Update(order);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Update order successfully!", order);
                    }
                    else
                    {
                        return new CustomResult(500, "Update order failed!", null);
                    }
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> UpdateOrderStatus(string id, int status)
        {
            try
            {
                var order = await db.OrderMsts.SingleOrDefaultAsync(o => o.Order_ID == id);
                if (order == null)
                {
                    return new CustomResult(404, "Order not found!", null);
                }
                else
                {
                    // Kiểm tra sự tồn tại
                    var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == order.UserID);

                    //kiểm tra
                    if (user == null)
                    {
                        return new CustomResult(500, "Add to cart failed! user not found.", null);
                    }

                    //gán                    
                    order.UserRegMst = user;

                    order.OrderStatus = status;
                    db.OrderMsts.Update(order);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Update order status successfully!", order);
                    }
                    else
                    {
                        return new CustomResult(500, "Update order status failed!", null);
                    }
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<MemoryStream> ExportPDFOrderDetails(string orderId)
        {
            using (var memoryStream = new MemoryStream())
            {
                using (var writer = new PdfWriter(memoryStream))
                {
                    using (var pdf = new PdfDocument(writer))
                    {
                        // Fetch order details efficiently
                        var order = await db.OrderMsts.Include(o => o.OrderDetailMsts).ThenInclude(d => d.ItemMst).FirstOrDefaultAsync(o => o.Order_ID == orderId);
                        if (order == null)
                        {
                            throw new Exception("Không tìm thấy đơn hàng có ID = " + orderId);
                        }
                        var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == order.UserID);

                        // Create document structure
                        Document document = new Document(pdf);

                        // Add header elements
                        Paragraph headerParagraph = new Paragraph("Order Details");
                        headerParagraph.SetFontSize(16);
                        headerParagraph.SetTextAlignment(TextAlignment.CENTER);
                        document.Add(headerParagraph);

                        // Add order information
                        Table table = new Table(new float[] { 150, 300 });
                        table.AddCell("Order ID:").AddCell(order.Order_ID.ToString());
                        table.AddCell("Order Date:").AddCell(order.OrderDate.ToString());
                        table.AddCell("Address:").AddCell(order.Order_Address);
                        table.AddCell("Phone:").AddCell(user.MobNo);
                        table.AddCell("Note:").AddCell(order.Order_Note);
                        table.AddCell("Email:").AddCell(user.EmailID);
                        document.Add(table);

                        // Add order details table
                        table = new Table(new float[] { 100, 150, 100, 150 });
                        table.AddCell("Product Name");
                        table.AddCell("Quantity");
                        table.AddCell("MRP ($)");
                        table.AddCell("Total");

                        decimal grandTotal = 0; // Biến để lưu tổng tiền

                        foreach (var detail in order.OrderDetailMsts)
                        {
                            table.AddCell(detail.Product_Name);
                            table.AddCell(detail.Quantity.ToString());
                            table.AddCell(detail.ItemMst.MRP.ToString()); // Assuming a decimal Price property
                            decimal totalPrice = (decimal)detail.ItemMst.MRP * (decimal)detail.Quantity;
                            table.AddCell(totalPrice.ToString("C"));

                            // Cập nhật tổng tiền
                            grandTotal += totalPrice;
                        }

                        // Add total row at the end
                        table.AddCell("").AddCell("").AddCell("Grand Total:").AddCell(grandTotal.ToString("C"));

                        document.Add(table);

                        // Close and return PDF
                        document.Close();
                        return memoryStream;
                    }
                }
            }
        }

        public async Task<List<OrderMst>> GetAllOrderExcel()
        {
            var orders = await db.OrderMsts.ToListAsync();
            return orders;
        }

        public async Task<List<OrderDetailMst>> GetAllOrderDetailExcel()
        {
            var orderDetailList = await db.OrderDetailMsts.Include(o => o.ItemMst).Include(o => o.OrderMst).ToListAsync();
            return orderDetailList;
        }
    }
}
