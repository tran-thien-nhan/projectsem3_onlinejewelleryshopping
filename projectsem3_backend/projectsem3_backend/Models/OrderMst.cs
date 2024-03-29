﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace projectsem3_backend.Models
{
    public class OrderMst
    {
        [Key]
        public string? Order_ID { get; set; }

        public string? UserID { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal? TotalPrice { get; set; }

        public string? Order_Address { get; set; }

        public string? order_MobNo { get; set; }

        public string? Order_Note { get; set; }
        public int? OrderStatus { get; set; }

        public int? orderPayment { get; set; }

        public string? creditCardNo { get; set; }

        public string? cvv { get; set; }

        public string? orderInfo { get; set; }

        public string? paymenturl { get; set; }

        public string? cancelreason { get; set; }

        public DateTime? OrderDate { get; set; }

        public bool? Visible { get; set; }

        // Navigation property
        public UserRegMst? UserRegMst { get; set; }
        public ICollection<OrderDetailMst>? OrderDetailMsts { get; set; }
    }
}
