namespace projectsem3_backend.CustomStatusCode
{
    public class DataToken
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public object? Data { get; set; }
        public string Token { get; set; }

        public string Role { get; set; }

        public DataToken(int status, string message, object? data, string token, string role)
        {
            Status = status;
            Message = message;
            Data = data;
            Token = token;
            Role = role;
        }
    }
}
