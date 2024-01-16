using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimMst
    {
        [ForeignKey("StyleId")]
        public string Style_Code { get; set; }

        [ForeignKey("StyleId")]
        public string Dim_QltyId { get; set; }

        [ForeignKey("StyleId")]
        public string Dim_SubTypeId { get; set; }

        [Required]
        public decimal Dim_Crt { get; set; }

        [Required]
        public decimal Dim_Pcs { get; set; }

        [Required]
        public decimal Dim_Gm { get; set; }

        [Required]
        public decimal Dim_Size { get; set; }

        [Required]
        public decimal Dim_Rate { get; set; }

        [Required]
        public decimal Dim_Amt { get; set; }

        public DimQltyMst? DimQltyMst { get; set; }
        public DimQltySubMst? DimQltySubMst { get; set; }
    }

}
