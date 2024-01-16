using Microsoft.EntityFrameworkCore;
using projectsem3_backend.Models;

namespace projectsem3_backend.data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<AdminLoginMst> AdminLoginMsts { get; set; }
        public DbSet<BrandMst> BrandMsts { get; set; }
        public DbSet<CatMst> CatMsts { get; set; }
        public DbSet<CertifyMst> CertifyMsts { get; set; }
        public DbSet<DimMst> DimMsts { get; set; }
        public DbSet<DimQltyMst> DimQltyMsts { get; set; }
        public DbSet<GoldKrtMst> GoldKrtMsts { get; set; }
        public DbSet<ProdMst> ProdMsts { get; set; }
        public DbSet<StoneMst> StoneMsts { get; set; }
        public DbSet<StoneQltyMst> StoneQltyMsts { get; set; }
        public DbSet<UserRegMst> UserRegMsts { get; set; }
        public DbSet<ItemMst> ItemMsts { get; set; }
        public DbSet<DimQltySubMst> DimQltySubMsts { get; set; }
        public DbSet<DimInfoMst> DimInfoMsts { get; set; }
        public DbSet<Inquiry> Inquiries { get; set; }
        public DbSet<JewelTypeMst> JewelTypeMsts { get; set; }
        public DbSet<CartList> CartLists { get; set; }
        public DbSet<OrderDetailMst> OrderDetailMsts { get; set; }
        public DbSet<OrderMst> OrderMsts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
