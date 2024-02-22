using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class AdminLoginMst
    {
        public string UserName { get; set; }

        public string? Password { get; set; }

        public string? AdminEmail { get; set; }

        public bool? OnlineStatus { get; set; }
        public DateTime? LastAccessTime { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
