using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class CatMst
    {
        [Key]
        [StringLength(10)]
        public string Cat_ID { get; set; }

        [Required]
        [StringLength(50)]
        public string Cat_Name { get; set; }
    }
}
