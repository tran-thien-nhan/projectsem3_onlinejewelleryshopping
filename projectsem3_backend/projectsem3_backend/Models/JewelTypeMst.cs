using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class JewelTypeMst
    {
        [Key]
        [MaxLength(10)]
        public string ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Jewellery_Type { get; set; }
    }

}
