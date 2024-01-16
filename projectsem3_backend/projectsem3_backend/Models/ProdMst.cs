using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class ProdMst
    {
        [Key]
        [MaxLength(10)]
        public string Prod_ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Prod_Type { get; set; }
    }
}
