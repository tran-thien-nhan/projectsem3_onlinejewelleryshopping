using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class Inquiry
    {
        [Key]
        public string ID { get; set; }

        public string UserID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Contact { get; set; }

        [Required]
        public string EmailID { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        public DateTime Cdate { get; set; }

        public bool Visible { get; set; }

        // Navigation property
        public UserRegMst? UserRegMst { get; set; }
    }
}
