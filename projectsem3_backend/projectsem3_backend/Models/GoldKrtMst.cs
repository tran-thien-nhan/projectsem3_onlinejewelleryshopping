using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class GoldKrtMst
    {
        [Key]
        public string GoldType_ID { get; set; }

        [Required]
        public string Gold_Crt { get; set; }
    }
}
