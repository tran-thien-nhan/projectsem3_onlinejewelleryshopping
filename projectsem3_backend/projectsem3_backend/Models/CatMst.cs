using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class CatMst
    {
        [Key]
        public string Cat_ID { get; set; }

        [Required]
        public string Cat_Name { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool Visible { get; set; }

        public ICollection<ItemMst>? ItemMsts { get; set; }
    }
}
