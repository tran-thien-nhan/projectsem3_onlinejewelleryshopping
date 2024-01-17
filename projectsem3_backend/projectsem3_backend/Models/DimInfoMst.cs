using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimInfoMst
    {
        [Key]
        public string DimID { get; set; }

        [Required]
        public string DimType { get; set; }

        [Required]
        public string DimSubType { get; set; }

        [Required]
        public string DimCrt { get; set; }

        [Required]
        public string DimPrice { get; set; }

        [Required]
        public string DimImg { get; set; }

        public DimMst? DimMst { get; set; }
    }
}
