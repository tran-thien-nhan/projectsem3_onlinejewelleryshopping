using Microsoft.IdentityModel.Tokens;
using projectsem3_backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace projectsem3_backend.Helper
{
    public class TokenService
    {
        public static string GenerateJSONWebTokenUser(IConfiguration configuration, UserRegMst user, string userid)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim("userId", userid),
                new Claim("userFname", user.UserFname),
                new Claim("userLname", user.UserLname),
                new Claim("emailId", user.EmailID),
                new Claim("address", user.Address),
                new Claim("city", user.City),
                new Claim("state", user.State),
                new Claim("MobNo", user.MobNo)
            };
            var token = new JwtSecurityToken(configuration["Jwt:Key"],
                configuration["Jwt.Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(360),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string GenerateJSONWebTokenAdmin(IConfiguration configuration, AdminLoginMst admin)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim("UserName", admin.UserName),
            };
            var token = new JwtSecurityToken(configuration["Jwt:Key"],
                configuration["Jwt.Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(360),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string GenerateJSONWebTokenExpiredDateForgotPassword(IConfiguration configuration, string userid)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Thêm claim chứa expirationTime
            var expirationTime = DateTime.Now.AddMinutes(1); // Thời gian hết hạn sau 1 phút
            var claims = new[]
            {
                new Claim("userid", userid),
                new Claim("exp", expirationTime.ToString("yyyyMMddHHmmss")) // Claim exp chứa thời gian hết hạn
            };

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"], // Thêm issuer nếu cần
                audience: configuration["Jwt.Audience"],
                claims: claims,
                expires: expirationTime, // Thiết lập thời gian hết hạn
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string ValidateAndExtractUserId(IConfiguration configuration, string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration["Jwt:Secret"]);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.First(x => x.Type == "userId").Value;

                return userId;
            }
            catch (Exception)
            {
                // Token không hợp lệ hoặc đã hết hạn
                return null;
            }
        }
    }
}
