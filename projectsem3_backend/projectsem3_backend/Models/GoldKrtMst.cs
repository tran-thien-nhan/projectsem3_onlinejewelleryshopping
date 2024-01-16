using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class GoldKrtMst
    {
        [Key]
        [MaxLength(10)]
        public string GoldType_ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Gold_Crt { get; set; }
    }
}
