using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class CatMst
    {
        [Key]
        [MaxLength(10)]
        public string Cat_ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string Cat_Name { get; set; }
    }
}
