using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class CertifyMst
    {
        [Key]
        public string Certify_ID { get; set; }

        [Required]
        public string Certify_Type { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool Visible { get; set; }

        public ICollection<ItemMst>? ItemMsts { get; set; }
    }
}
