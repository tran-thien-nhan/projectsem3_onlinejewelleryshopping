using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class UserRegMst
    {
        [Key]
        [MaxLength(10)]
        public string UserID { get; set; }

        [Required]
        public string UserFname { get; set; }

        [Required]
        public string UserLname { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        [MaxLength(50)]
        public string State { get; set; }

        [Required]
        public string MobNo { get; set; }

        [Required]
        public string EmailID { get; set; }

        [Required]
        [MaxLength(50)]
        public string DOB { get; set; }

        [Required]
        [MaxLength(50)]
        public string CDate { get; set; }

        [Required]
        [MaxLength(50)]
        public string Password { get; set; }
        
        public ICollection<CartList> CartLists { get; set; }
        public ICollection<OrderMst> OrderMsts { get; set; }
    }
}
