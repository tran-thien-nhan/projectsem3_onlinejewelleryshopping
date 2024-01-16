using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class Inquiry
    {
        [Key]
        [MaxLength(10)]
        public string ID { get; set; }

        [MaxLength(10)]
        public string userID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string City { get; set; }

        [Required]
        [MaxLength(10)]
        public string Contact { get; set; }

        [Required]
        [MaxLength(50)]
        public string EmailID { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        public DateTime Cdate { get; set; }

        // Navigation property
        public UserRegMst UserRegMst { get; set; }
    }
}
