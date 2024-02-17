using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class StoneQltyMst
    {
        [Key]
        public string StoneQlty_ID { get; set; }
     
        public string? StoneQlty { get; set; }

        public int? Stone_Year { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public bool? Visible { get; set; }

        public ICollection<StoneMst>? StoneMsts { get; set; }
        public ICollection<ItemMst>? ItemMsts { get; set; }
    }
}
