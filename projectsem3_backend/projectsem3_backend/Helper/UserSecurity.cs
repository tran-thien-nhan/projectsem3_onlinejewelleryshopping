using System.Security.Cryptography;
using System.Text;

namespace projectsem3_backend.Helper
{
    public class UserSecurity
    {
        public static string HashPassword(string password)
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt(12);

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

            return hashedPassword;
        }

        public static string DecryptPassword(string password)
        {
            string salt = BCrypt.Net.BCrypt.GenerateSalt(12);

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);

            return hashedPassword;
        }

        // Hàm kiểm tra mật khẩu có đúng hay không
        public static bool VerifyPassword(string inputPassword, string hashedPassword)
        {
            // Sử dụng hàm kiểm tra của thư viện bcrypt
            return BCrypt.Net.BCrypt.Verify(inputPassword, hashedPassword);
        }
    }
}
