using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class BrandMst
    {
        public string Brand_ID { get; set; }

        public string? Brand_Type { get; set; }

        public int? Brand_Year { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool? Visible { get; set; }

        public ICollection<ItemMst>? ItemMsts { get; set; }
    }
}
