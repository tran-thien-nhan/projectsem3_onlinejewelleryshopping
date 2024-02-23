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
        public async Task<int> CheckQuantity(string userId)
        {
            try
            {
                // Lấy listCart của user dựa vào userId
                var listCart = await db.CartLists
                    .Include(c => c.ItemMst)
                    .Where(c => c.UserID == userId)
                    .ToListAsync();
                var result = 0;
                foreach (var cartItem in listCart)
                {
                    var itemInDB = await db.ItemMsts
                        .SingleOrDefaultAsync(i => i.Style_Code == cartItem.Style_Code);

                    if (itemInDB == null)
                    {
                        return -1;
                    }

                    // Nếu số lượng item trong cart nhiều hơn số lượng hiện có trong DB
                    if (cartItem.Quantity > itemInDB.Quantity)
                    {
                        result++;
                    }
                }

                if (result > 0)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                return -2;
            }
        }

        public async Task<CustomResult> UpdateCartGetAllQuantity(string userId)
        {
            try
            {
                // Lấy listCart của user dựa vào userId
                var listCart = await db.CartLists
                    .Include(c => c.ItemMst)
                    .Where(c => c.UserID == userId)
                    .ToListAsync();

                foreach (var cartItem in listCart)
                {
                    var itemInDB = await db.ItemMsts
                        .SingleOrDefaultAsync(i => i.Style_Code == cartItem.Style_Code);

                    if (itemInDB == null)
                    {
                        return new CustomResult(400, "Item not found", null);
                    }

                    // Nếu số lượng item trong cart nhiều hơn số lượng hiện có trong DB
                    if (cartItem.Quantity > itemInDB.Quantity)
                    {
                        cartItem.Quantity = itemInDB.Quantity;
                        db.CartLists.Update(cartItem);
                    }
                    else
                    {
                        cartItem.Quantity = cartItem.Quantity;
                        db.CartLists.Update(cartItem);
                    }
                }

                await db.SaveChangesAsync();
                return new CustomResult(200, "Update cart successfully!", null);
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }


        public async Task<CustomResult> CreateOrder(OrderMst order)
        {
            string paymentMethod = "";

            using (var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    if (order.Order_ID == null)
                    {
                        order.Order_ID = Guid.NewGuid().ToString();
                    }
                    else
                    {
                        order.Order_ID = order.Order_ID;
                    }

                    // Lấy listCart của user dựa vào userId
                    var listCart = await db.CartLists.Include(c => c.ItemMst).Where(c => c.UserID == order.UserID).ToListAsync();

                    order.OrderDetailMsts = new List<OrderDetailMst>();

                    if (listCart == null || listCart.Count == 0)
                    {
                        transaction.Rollback();
                        return new CustomResult(404, "Cart empty", null);
                    }

                    // Kiểm tra số lượng hiện có của item trong cart và trong database
                    foreach (var cartItem in listCart)
                    {
                        var itemInDB = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == cartItem.Style_Code);

                        // Nếu số lượng item trong cart nhiều hơn số lượng hiện có trong DB
                        if (cartItem.Quantity > itemInDB.Quantity)
                        {
                            transaction.Rollback();
                            return new CustomResult(400, "Not enough quantity available for some items", null);
                        }
                    }

                    if (order.order_MobNo.Length < 10)
                    {
                        transaction.Rollback();
                        return new CustomResult(400, "Invalid phone number", null);
                    }

                    if(order.orderPayment == null)
                    {
                        transaction.Rollback();
                        return new CustomResult(400, "Invalid payment method", null);
                    }

                    if (order.orderPayment == 2)
                    {
                        if (order.creditCardNo.Length < 16 || order.cvv.Length < 3)
                        {
                            transaction.Rollback();
                            return new CustomResult(400, "Invalid credit card information", null);
                        }
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

                    // Kiểm tra giá trị của orderPayment
                    if (order.orderPayment == 1)
                    {
                        paymentMethod = "cash";
                    }
                    else if (order.orderPayment == 2)
                    {
                        paymentMethod = "credit card";
                    }
                    else if (order.orderPayment == 3)
                    {
                        paymentMethod = "Momo";
                    }
                    else
                    {
                        // Xử lý trường hợp giá trị orderPayment không hợp lệ
                        paymentMethod = "Unknown";
                    }

                    // Gán thông tin order
                    order.UserRegMst = user;
                    order.OrderStatus = 1;
                    order.TotalPrice = listCart.Sum(c => c.MRP * c.Quantity);
                    order.OrderDate = DateTime.Now;
                    order.paymenturl = order.paymenturl;
                    order.orderInfo = $"Order placed successfully at {order.OrderDate} via {paymentMethod}";

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
                    var orderPayment = order.orderPayment;
                    var payment = "";
                    if (orderPayment == 1)
                    {
                        payment = "by cash";
                    }
                    else if (orderPayment == 2)
                    {
                        payment = "by credit card";
                    }
                    else if (orderPayment == 3)
                    {
                        payment = "by Momo";
                    }
                    else
                    {
                        payment = "unknown";
                    }
                    // Gửi email xác nhận đơn hàng
                    await emailService.SendEmailConfirmationAsync(userEmail, order.Order_ID, orderDetailList, payment);

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

                    if(order.OrderStatus == 2)
                    {
                        await emailService.SendMailShippingAsync(user.EmailID, order.Order_ID);
                    }

                    if(order.OrderStatus == 3)
                    {
                        await emailService.SendMailDeliveredAsync(user.EmailID, order.Order_ID);
                    }

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
            string paymentMethod = "";

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

                        // Kiểm tra giá trị của orderPayment
                        if (order.orderPayment == 1)
                        {
                            paymentMethod = "by cash";
                        }
                        else if (order.orderPayment == 2)
                        {
                            paymentMethod = "by credit card";
                        }
                        else if (order.orderPayment == 3)
                        {
                            paymentMethod = "by Momo";
                        }
                        else
                        {
                            // Xử lý trường hợp giá trị orderPayment không hợp lệ
                            paymentMethod = "Unknown";
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
                        table.AddCell("Phone:").AddCell(order.order_MobNo);
                        table.AddCell("Note:").AddCell(order.Order_Note);
                        table.AddCell("Email:").AddCell(user.EmailID);
                        table.AddCell("Payment Method:").AddCell(paymentMethod);
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

        public async Task<CustomResult> GetTotalMoney()
        {
            try
            {
                var order = await db.OrderMsts.Where(o => o.OrderStatus != 4).ToListAsync();
                if (order == null)
                {
                    return new CustomResult(404, "Order not found!", null);
                }
                else
                {
                    var totalMoney = order.Sum(o => o.TotalPrice);
                    return new CustomResult(200, "Get total money successfully!", totalMoney);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> CancelOrder(string orderId, string cancelreason)
        {
            using (var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    var order = await db.OrderMsts.Include(o => o.OrderDetailMsts).SingleOrDefaultAsync(o => o.Order_ID == orderId);
                    if (order == null)
                    {
                        transaction.Rollback();
                        return new CustomResult(404, "Order not found!", null);
                    }

                    // Kiểm tra xem order có thể hủy hay không
                    if (order.OrderStatus != 1)
                    {
                        transaction.Rollback();
                        return new CustomResult(400, "Order cannot be cancelled!", null);
                    }
                    else
                    {
                        order.OrderStatus = 4;
                        order.cancelreason = cancelreason;
                    }

                    // Trả lại số lượng item trong order về lại cho ItemMst
                    foreach (var detail in order.OrderDetailMsts)
                    {
                        var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == detail.Style_Code);
                        if (item != null)
                        {
                            item.Quantity += detail.Quantity;
                            db.ItemMsts.Update(item);
                        }
                    }

                    // Xóa order
                    //db.OrderMsts.Remove(order);
                    var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.UserID == order.UserID);
                    var userEmail = user.EmailID;

                    // Lưu vào db
                    var result = await db.SaveChangesAsync();

                    await emailService.SendMailCancelOrderAsync(userEmail, orderId, cancelreason);

                    transaction.Commit(); // Dừng transaction

                    if (result != 1)
                    {
                        return new CustomResult(200, "Cancel order successfully!", order);
                    }
                    else
                    {
                        transaction.Rollback();
                        return new CustomResult(500, "Cancel order failed!", null);
                    }
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return new CustomResult(500, ex.Message, null);
                }
            }
        }

        public async Task<CustomResult> SendMailOTP(string email)
        {
            try
            {
                var user = await db.UserRegMsts.SingleOrDefaultAsync(u => u.EmailID == email);
                if (user == null)
                {
                    return new CustomResult(404, "User not found!", null);
                }
                else
                {
                    var otp = new Random().Next(100000, 999999).ToString();
                    await emailService.SendMailOTPAsync(email, otp);

                    return new CustomResult(200, "Send mail OTP successfully!", otp);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }
    }
}
