using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimInfoMst
    {
        [Key]
        [MaxLength(10)]
        public string DimID { get; set; }

        [Required]
        [MaxLength(50)]
        public string DimType { get; set; }

        [Required]
        [MaxLength(50)]
        public string DimSubType { get; set; }

        [Required]
        [MaxLength(50)]
        public string DimCrt { get; set; }

        [Required]
        [MaxLength(50)]
        public string DimPrice { get; set; }

        [Required]
        [MaxLength(50)]
        public string DimImg { get; set; }
    }
}
