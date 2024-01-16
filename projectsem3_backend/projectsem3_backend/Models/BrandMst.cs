using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class BrandMst
    {
        [Key]
        [MaxLength(10)]
        public string Brand_ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Brand_Type { get; set; }

        public string? ImagePath { get; set; }
    }
}
