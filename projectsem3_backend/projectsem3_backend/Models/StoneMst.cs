using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class StoneMst
    {
        [Key]
        public string Id { get; set; }

        public string Style_Code { get; set; }
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
    }

}
