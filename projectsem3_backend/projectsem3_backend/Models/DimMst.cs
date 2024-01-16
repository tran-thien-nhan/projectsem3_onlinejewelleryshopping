﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class DimMst
    {
        [Key]
        [MaxLength(50)]
        [ForeignKey("ItemMst")]
        public string Style_Code { get; set; }

        [Required]
        [ForeignKey("DimQltyMst")]
        public string DimQlty_ID { get; set; }

        [Required]
        [ForeignKey("DimQltySubMst")]
        public string DimSubType_ID { get; set; }

        [ForeignKey("DimInfoMst")]
        public string DimID { get; set; }

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

        public ItemMst ItemMst { get; set; }
        public DimQltyMst DimQltyMst { get; set; }
        public DimQltySubMst DimQltySubMst { get; set; }
        public DimInfoMst DimInfoMst { get; set; }
    }
}
