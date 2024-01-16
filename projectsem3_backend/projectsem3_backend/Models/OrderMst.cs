using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class OrderMst
    {
        [Key]
        [MaxLength(10)]
        public string ID { get; set; }

        [MaxLength(10)]
        [ForeignKey("UserRegMst")]
        public string userID { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal TotalPrice { get; set; }

        public DateTime OrderDate { get; set; }

        // Navigation property
        public UserRegMst UserRegMst { get; set; }
    }
}
