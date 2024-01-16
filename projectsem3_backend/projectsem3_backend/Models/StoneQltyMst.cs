using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class StoneQltyMst
    {
        [Key]
        [MaxLength(10)]
        public string StoneQlty_ID { get; set; }

        [Required]
        [MaxLength(50)]
        public string StoneQlty { get; set; }
    }
}
