using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class ProdMst
    {      
        public string Prod_ID { get; set; }

        public string? Prod_Type { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool? Visible { get; set; }

        public ICollection<ItemMst>? ItemMsts { get; set; }
    }
}
