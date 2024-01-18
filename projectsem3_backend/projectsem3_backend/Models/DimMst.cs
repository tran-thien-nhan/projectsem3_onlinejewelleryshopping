using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimMst
    {
        [Required]
        public string Style_Code { get; set; }

        [Required]
        public string DimQlty_ID { get; set; }

        [Required]
        public string DimSubType_ID { get; set; }

        [Required]
        public string DimID { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Dim_Crt { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Dim_Pcs { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Dim_Gm { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Dim_Size { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Dim_Rate { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        [Required]
        public decimal Dim_Amt { get; set; }

        public string? ImagePath { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool Visible { get; set; }

        public ItemMst? ItemMst { get; set; }
        public DimQltyMst? DimQltyMst { get; set; }
        public DimQltySubMst? DimQltySubMst { get; set; }
        public DimInfoMst? DimInfoMst { get; set; }
    }
}
