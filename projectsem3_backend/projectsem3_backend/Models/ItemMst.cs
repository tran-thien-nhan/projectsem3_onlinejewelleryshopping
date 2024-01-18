﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class ItemMst
    {
        [Key]
        public string Style_Code { get; set; }

        [Required]
        public string Product_Name { get; set; }

        [Required]
        public int Pairs { get; set; }

        [Required]
        public string Brand_ID { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public string Cat_ID { get; set; }

        [Required]
        public string Prod_Quality { get; set; }

        [Required]
        public string Certify_ID { get; set; }

        [Required]
        public string Prod_ID { get; set; }

        [Required]        
        public string GoldType_ID { get; set; }

        [Required]
        public string Jewellery_ID { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Gold_Wt { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Stone_Wt { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Net_Gold { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Wstg_Per { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Wstg { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Tot_Gross_Wt { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Gold_Rate { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Gold_Amt { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Gold_Making { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Stone_Making { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Other_Making { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal Tot_Making { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Required]
        public decimal MRP { get; set; }

        public string? ImagePath { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool Visible { get; set; }

        // Navigation properties
        public BrandMst? BrandMst { get; set; }

        public CatMst? CatMst { get; set; }

        public CertifyMst? CertifyMst { get; set; }

        public ProdMst? ProdMst { get; set; }

        public GoldKrtMst? GoldKrtMst { get; set; }

        public JewelTypeMst? JewelTypeMst { get; set; }

        public ICollection<StoneMst>? StoneMsts { get; set; }
        public ICollection<DimMst>? DimMsts { get; set; }        
        public ICollection<OrderDetailMst>? OrderDetailMsts { get; set; }
        public ICollection<CartList>? CartLists { get; set; }
    }

}
