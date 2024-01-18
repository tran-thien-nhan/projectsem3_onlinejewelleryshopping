using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{

    public class StoneMst
    {
        [Required]
        public string Style_Code { get; set; }

        [Required]
        public string StoneQlty_ID { get; set;}

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Stone_Gm { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Stone_Pcs { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Stone_Crt { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Stone_Rate { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Stone_Amt { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool Visible { get; set; }

        // Navigation properties
        public ItemMst? ItemMst { get; set; }

        public StoneQltyMst? StoneQltyMst { get; set; }
    }
}
