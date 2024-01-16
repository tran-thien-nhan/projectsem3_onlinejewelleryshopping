using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimQltySubMst
    {
        [Key]
        public string DimSubType_ID { get; set; }

        [Required]
        public string DimQlty { get; set; }
    }
}
