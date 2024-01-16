using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimQltySubMst
    {
        [Key]
        [MaxLength(10)]
        public string DimSubType_ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string DimQlty { get; set; }
    }
}
