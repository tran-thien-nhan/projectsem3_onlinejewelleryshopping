using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class Inquiry
    {
        [Key]
        public string ID { get; set; }

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
        public DateTime CDate { get; set; }
    }

}
