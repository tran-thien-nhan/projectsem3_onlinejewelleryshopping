using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimQltyMst
    {
        public string DimQlty_ID { get; set; }

        public string? DimQlty { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool? Visible { get; set; }

        public ICollection<DimMst>? DimMsts { get; set; }
    }
}
