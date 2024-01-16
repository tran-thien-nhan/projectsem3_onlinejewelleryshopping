using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimQltyMst
    {
        [Key]
        [MaxLength(10)]
        public string DimQlty_ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string DimQlty { get; set; }
    }
}
