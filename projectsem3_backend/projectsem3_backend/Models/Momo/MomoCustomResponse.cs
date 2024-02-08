namespace projectsem3_backend.Models.Momo
{
    public class MomoCustomResponse
    {
        public MomoCreatePaymentResponseModel Result { get; set; }
        public string OrderId { get; set; } = string.Empty;

        public string? ErrorMessages { get; set; }
    }
}
