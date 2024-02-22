using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class Wishlist
    {
        [Key]
        public string WhistList_ID { get; set; }
        public string? UserID { get; set; }
        public string? Style_Code { get; set; }

        // Navigation properties
        public UserRegMst? UserRegMst { get; set; }
        public ItemMst? ItemMst { get; set; }
    }
}
