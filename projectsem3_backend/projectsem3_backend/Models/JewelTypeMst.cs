using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class JewelTypeMst
    {
        [Key]
        public string ID { get; set; }

        [Required]
        public string Jewellery_Type { get; set; }

        public ICollection<ItemMst>? ItemMsts { get; set; }
    }

}
