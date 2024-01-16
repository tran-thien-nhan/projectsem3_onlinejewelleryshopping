using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class OrderDetailMst
    {
        [Key]
        [MaxLength(10)]
        public string OrderDetail_ID { get; set; }

        [MaxLength(10)]
        [ForeignKey("OrderMst")]
        public string Order_ID { get; set; }

        [MaxLength(50)]
        [ForeignKey("ItemMst")]
        public string Style_Code { get; set; }

        [Required]
        [MaxLength(50)]
        public string Product_Name { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Gold_Amt { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Stone_Amt { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Making_Amt { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Total_Amt { get; set; }

        // Navigation properties
        public OrderMst OrderMst { get; set; }

        public ItemMst ItemMst { get; set; }
    }
}
