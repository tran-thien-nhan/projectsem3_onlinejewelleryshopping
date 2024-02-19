using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class Inquiry
    {
        [Key]
        public string Inquiry_ID { get; set; }

        public string? UserID { get; set; }


        public string? Name { get; set; }


        public string? City { get; set; }


        public string? Contact { get; set; }

        public string? EmailID { get; set; }

        public string? Comment { get; set; }

        public DateTime? Cdate { get; set; }

        public bool? Visible { get; set; }

        // Navigation property
        public UserRegMst? UserRegMst { get; set; }
    }
}
