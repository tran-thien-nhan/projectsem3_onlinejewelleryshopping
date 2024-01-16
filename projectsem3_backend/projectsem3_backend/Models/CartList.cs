using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class CartList
    {
        [Key]
        [MaxLength(10)]
        public string ID { get; set; }

        [MaxLength(10)]
        [ForeignKey("UserRegMst")]
        public string userID { get; set; }

        [MaxLength(50)]
        [ForeignKey("ItemMst")]
        public string Style_Code { get; set; }

        [Required]
        [MaxLength(50)]
        public string Product_Name { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal MRP { get; set; }

        // Navigation properties
        public UserRegMst UserRegMst { get; set; }

        public ItemMst ItemMst { get; set; }
    }
}
