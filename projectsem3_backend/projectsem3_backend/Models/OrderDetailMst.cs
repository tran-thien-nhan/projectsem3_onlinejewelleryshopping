using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class OrderDetailMst
    {
        public string? Order_ID { get; set; }

        public string? Style_Code { get; set; }

        public string? Product_Name { get; set; }


        public int? Quantity { get; set; }

        [Column(TypeName = "decimal(10, 2)")]

        public decimal? Gold_Amt { get; set; }

        [Column(TypeName = "decimal(10, 2)")]

        public decimal? Stone_Amt { get; set; }

        [Column(TypeName = "decimal(10, 2)")]

        public decimal? Making_Amt { get; set; }

        [Column(TypeName = "decimal(10, 2)")]

        public decimal? Total_Amt { get; set; }

        // Navigation properties
        public OrderMst? OrderMst { get; set; }

        public ItemMst? ItemMst { get; set; }
    }
}
