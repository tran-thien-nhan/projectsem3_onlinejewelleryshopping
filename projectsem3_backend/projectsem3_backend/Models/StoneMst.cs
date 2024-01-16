using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{

    public class StoneMst
    {
        [MaxLength(50)]
        [ForeignKey("ItemMst")]
        public string Style_Code { get; set; }

        [MaxLength(50)]
        [ForeignKey("StoneQltyMst")]
        public string StoneQlty_ID { get; set; }

        [Required]
        public decimal Stone_Gm { get; set; }

        [Required]
        public decimal Stone_Pcs { get; set; }

        [Required]
        public decimal Stone_Crt { get; set; }

        [Required]
        public decimal Stone_Rate { get; set; }

        [Required]
        public decimal Stone_Amt { get; set; }

        // Navigation properties
        public ItemMst ItemMst { get; set; }

        public StoneQltyMst StoneQltyMst { get; set; }
    }
}
