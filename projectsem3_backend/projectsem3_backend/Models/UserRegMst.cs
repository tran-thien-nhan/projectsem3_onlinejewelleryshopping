using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class UserRegMst
    {
        [Key]
        public string UserID { get; set; }

        public string? UserName { get; set; }

        public string? UserFname { get; set; }


        public string? UserLname { get; set; }


        public string? Address { get; set; }


        public string? City { get; set; }


        public string? State { get; set; }


        public string? MobNo { get; set; }


        public string? EmailID { get; set; }


        public DateTime? DOB { get; set; }


        public DateTime? CDate { get; set; }


        public string Password { get; set; }

        public bool? IsVerified { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public ICollection<CartList>? CartLists { get; set; }
        public ICollection<OrderMst>? OrderMsts { get; set; }
        public ICollection<Inquiry>? Inquiries { get; set; }
    }
}
