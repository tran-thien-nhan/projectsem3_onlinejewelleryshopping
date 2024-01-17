using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimQltyMst
    {
        [Key]
        public string DimQlty_ID { get; set; }

        [Required]
        public string DimQlty { get; set; }

        public ICollection<DimMst>? DimMsts { get; set; }
    }
}
