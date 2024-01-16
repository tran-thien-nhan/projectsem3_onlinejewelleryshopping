using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace projectsem3_backend.Models
{
    public class CartList
    {
        [Key]
        public string ID { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public decimal MRP { get; set; }
    }
}
