using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimInfoMst
    {
        [Key]
        public string DimID { get; set; }

        public string DimType { get; set; }

        public string? DimSubType { get; set; }

        public string? DimCrt { get; set; }

        public string? DimPrice { get; set; }

        public string? DimImg { get; set; }

        public int? DimYear { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool Visible { get; set; }

        public ICollection<DimMst>? DimMsts { get; set; }

        }
}
