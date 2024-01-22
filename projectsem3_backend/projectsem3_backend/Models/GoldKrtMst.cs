using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class GoldKrtMst
    {
        public string GoldType_ID { get; set; }
     
        public string? Gold_Crt { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool? Visible { get; set; }

        public ICollection<ItemMst>? ItemMsts { get; set; }
    }
}
