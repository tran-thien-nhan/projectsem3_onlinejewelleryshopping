using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class BrandMst
    {
        [Key]
        public string Brand_ID { get; set; }

        [Required]
        public string Brand_Type { get; set; }

        public string? ImagePath { get; set; }

        public ICollection<ItemMst>? ItemMsts { get; set; }
    }
}
