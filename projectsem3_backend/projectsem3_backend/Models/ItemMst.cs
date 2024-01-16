using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class ItemMst
    {
        [Key]
        public string Style_Code { get; set; }

        [Required]
        public int Pairs { get; set; }

        public string Brand_ID { get; set; }

        [Required]
        public int Quantity { get; set; }


        public string Cat_ID { get; set; }

        [Required]
        public string Prod_Quality { get; set; }

        public string Certify_ID { get; set; }

        public string Prod_ID { get; set; }

        public string GoldType_ID { get; set; }

        [Required]
        public decimal Gold_Wt { get; set; }

        [Required]
        public decimal Stone_Wt { get; set; }

        [Required]
        public decimal Net_Gold { get; set; }

        [Required]
        public decimal Wstg_Per { get; set; }

        [Required]
        public decimal Wstg { get; set; }

        [Required]
        public decimal Tot_Gross_Wt { get; set; }

        [Required]
        public decimal Gold_Rate { get; set; }

        [Required]
        public decimal Gold_Amt { get; set; }

        [Required]
        public decimal Gold_Making { get; set; }

        [Required]
        public decimal Stone_Making { get; set; }

        [Required]
        public decimal Other_Making { get; set; }

        [Required]
        public decimal Tot_Making { get; set; }

        [Required]
        public decimal MRP { get; set; }

        public BrandMst BrandMst { get; set; }
        public CatMst CatMst { get; set; }
        public CertifyMst CertifyMst { get; set; }
        public ProdMst ProdMst { get; set; }
        public GoldKrtMst GoldKrtMst { get; set; }
    }

}
