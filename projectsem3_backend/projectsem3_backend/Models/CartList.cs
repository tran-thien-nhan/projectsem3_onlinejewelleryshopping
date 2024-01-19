using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class CartList
    {
        [Key]
        public string ID { get; set; }

        public string UserID { get; set; }

        public string Style_Code { get; set; }

        [Required]
        public string Product_Name { get; set; }

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal MRP { get; set; }

        // Navigation properties
        public UserRegMst? UserRegMst { get; set; }

        public ItemMst? ItemMst { get; set; }
    }
}
