using iText.Kernel.Pdf.Canvas.Wmf;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.Crmf;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Models.Momo;
using projectsem3_backend.Repository;
using RestSharp;
using System.Security.Cryptography;
using System.Text;

namespace projectsem3_backend.Service
{
    public class MomoRepo : IMomoService
    {
        private readonly IOptions<MomoOptionModel> _options;
        private readonly DatabaseContext db;
        private readonly IOrderRepo orderRepo;

        public MomoRepo(DatabaseContext db, IOptions<MomoOptionModel> options, IOrderRepo orderRepo)
        {
            this.db = db;
            _options = options;
            this.orderRepo = orderRepo;
        }

        public async Task<MomoCustomResponse> CreatePaymentAsync(OrderMst model)
        {
            string paymentMethod = "";
            using (var transaction = db.Database.BeginTransaction())
            {
                try
                {
                    model.Order_ID = Guid.NewGuid().ToString();                   

                    if(model.orderPayment != 3)
                    {
                        transaction.Rollback();
                        return new MomoCustomResponse()
                        {
                            Result = null,
                            OrderId = model.Order_ID,
                            ErrorMessages = "Phương thức thanh toán không hợp lệ"
                        };
                    }
                    else
                    {
                        paymentMethod = "Momo";
                    }

                    model.orderInfo = "Thanh toán đơn hàng " + model.Order_ID + " bằng " + paymentMethod;

                    var rawData = $"partnerCode={_options.Value.PartnerCode}&accessKey={_options.Value.AccessKey}&requestId={model.Order_ID}&amount={model.TotalPrice}&orderId={model.Order_ID}&orderInfo={model.orderInfo}&returnUrl={_options.Value.ReturnUrl}&notifyUrl={_options.Value.NotifyUrl}&extraData=";
                    var signature = ComputeHmacSha256(rawData, _options.Value.SecretKey);
                    var client = new RestClient(_options.Value.MomoApiUrl);
                    var request = new RestRequest() { Method = Method.Post };
                    request.AddHeader("Content-Type", "application/json; charset=UTF-8");
                    var requestData = new
                    {
                        accessKey = _options.Value.AccessKey,
                        partnerCode = _options.Value.PartnerCode,
                        requestType = _options.Value.RequestType,
                        notifyUrl = _options.Value.NotifyUrl,
                        returnUrl = _options.Value.ReturnUrl,
                        orderId = model.Order_ID,
                        amount = model.TotalPrice.ToString(),
                        orderInfo = model.orderInfo,
                        requestId = model.Order_ID,
                        extraData = "",
                        signature = signature
                    };
                    request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);
                    var response = await client.ExecuteAsync(request);

                    if (!string.IsNullOrEmpty(response.Content))
                    {
                        var result = JsonConvert.DeserializeObject<MomoCreatePaymentResponseModel>(response.Content);

                        if (result != null)
                        {
                            return new MomoCustomResponse()
                            {
                                Result = result,
                                OrderId = model.Order_ID
                            };
                        }
                    }

                    // Nếu response rỗng hoặc không thể deserialize thành đối tượng MomoCreatePaymentResponseModel
                    transaction.Rollback();
                    return new MomoCustomResponse()
                    {
                        Result = null,
                        OrderId = model.Order_ID,
                        ErrorMessages = "Không thể tạo đơn hàng"
                    };

                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    return new MomoCustomResponse()
                    {
                        Result = null,
                        OrderId = model.Order_ID,
                        ErrorMessages = e.Message
                    };
                }
            }
        }

        private string ComputeHmacSha256(string message, string secretKey)
        {
            var keyBytes = Encoding.UTF8.GetBytes(secretKey);
            var messageBytes = Encoding.UTF8.GetBytes(message);

            byte[] hashBytes;

            using (var hmac = new HMACSHA256(keyBytes))
            {
                hashBytes = hmac.ComputeHash(messageBytes);
            }

            var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

            return hashString;
        }
    }
}
