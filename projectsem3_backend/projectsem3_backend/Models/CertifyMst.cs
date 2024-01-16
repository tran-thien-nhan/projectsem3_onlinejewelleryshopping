using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class CertifyMst
    {
        [Key]
        public string Certify_Id { get; set; }

        [Required]
        public string Certify_Type { get; set; }
    }

}
