﻿using Microsoft.IdentityModel.Tokens;
using projectsem3_backend.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace projectsem3_backend.Helper
{
    public class TokenService
    {
        public static string GenerateJSONWebTokenUser(IConfiguration configuration, UserRegMst user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[] {
                new Claim("userId", user.UserID),
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
    }
}