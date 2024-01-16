using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class CertifyMst
    {
        [Key]
        [MaxLength(10)]
        public string Certify_ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Certify_Type { get; set; }
    }
}
