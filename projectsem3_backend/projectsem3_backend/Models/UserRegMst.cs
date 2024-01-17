using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class UserRegMst
    {
        [Key]
        public string UserID { get; set; }

        [Required]
        public string UserFname { get; set; }

        [Required]
        public string UserLname { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string MobNo { get; set; }

        [Required]
        public string EmailID { get; set; }

        [Required]
        public string DOB { get; set; }

        [Required]
        public string CDate { get; set; }

        [Required]
        public string Password { get; set; }

        public string? UserImagePath { get; set; }

        public ICollection<CartList> CartLists { get; set; }
        public ICollection<OrderMst> OrderMsts { get; set; }
        public ICollection<Inquiry> Inquiries { get; set; }
    }
}
