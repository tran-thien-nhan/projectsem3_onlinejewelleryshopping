using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimMst
    {

        public string? Style_Code { get; set; }


        public string? DimQlty_ID { get; set; }


        public string? DimSubType_ID { get; set; }


        public string? DimID { get; set; }

        [Column(TypeName = "decimal(10,2)")]

        public decimal? Dim_Crt { get; set; }

        [Column(TypeName = "decimal(10,2)")]

        public decimal? Dim_Pcs { get; set; }

        [Column(TypeName = "decimal(10,2)")]

        public decimal? Dim_Gm { get; set; }

        [Column(TypeName = "decimal(10,2)")]

        public decimal? Dim_Size { get; set; }

        [Column(TypeName = "decimal(10,2)")]

        public decimal? Dim_Rate { get; set; }

        [Column(TypeName = "decimal(10,2)")]

        public decimal? Dim_Amt { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool? Visible { get; set; }

        public ItemMst? ItemMst { get; set; }
        public DimQltyMst? DimQltyMst { get; set; }
        public DimQltySubMst? DimQltySubMst { get; set; }
        public DimInfoMst? DimInfoMst { get; set; }
    }
}
