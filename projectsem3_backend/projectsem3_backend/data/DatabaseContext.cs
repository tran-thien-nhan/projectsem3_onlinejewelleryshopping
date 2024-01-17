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

            //1
            modelBuilder.Entity<AdminLoginMst>(a =>
            {
                a.HasKey(a => a.UserName);
            });


            //2
            modelBuilder.Entity<Inquiry>(i =>
            {
                i.HasKey(i => i.ID);
                i.HasOne(i => i.UserRegMst).WithMany(i => i.Inquiries).HasForeignKey(i => i.UserID);
            });

            //3
            modelBuilder.Entity<UserRegMst>(u =>
            {
                u.HasKey(u => u.UserID);
                u.HasMany(u => u.CartLists).WithOne(u => u.UserRegMst).HasForeignKey(u => u.UserID);
                u.HasMany(u => u.OrderMsts).WithOne(u => u.UserRegMst).HasForeignKey(u => u.UserID);    
                u.HasMany(u => u.Inquiries).WithOne(u => u.UserRegMst).HasForeignKey(u => u.UserID);
            });

            //4
            modelBuilder.Entity<CartList>(c =>
            {
                c.HasKey(c => c.ID);
                c.HasOne(c => c.UserRegMst).WithMany(c => c.CartLists).HasForeignKey(c => c.UserID);
                c.HasOne(c => c.ItemMst).WithMany(c => c.CartLists).HasForeignKey(c => c.Style_Code);
            });

            //5
            modelBuilder.Entity<OrderMst>(o =>
            {
                o.HasKey(o => o.Order_ID);
                o.HasOne(o => o.UserRegMst).WithMany(o => o.OrderMsts).HasForeignKey(o => o.UserID);
                o.HasMany(o => o.OrderDetailMsts).WithOne(o => o.OrderMst).HasForeignKey(o => o.Order_ID);
            }); 

            //6
            modelBuilder.Entity<OrderDetailMst>(od =>
            {
                od.HasKey(od => new {od.Order_ID, od.Style_Code});
                od.HasOne(od => od.ItemMst).WithMany(od => od.OrderDetailMsts).HasForeignKey(od => od.Style_Code);
                od.HasOne(od => od.OrderMst).WithMany(od => od.OrderDetailMsts).HasForeignKey(od => od.Order_ID);
            });

            //7
            modelBuilder.Entity<StoneMst>(s =>
            {
                s.HasKey(s => new {s.Style_Code, s.StoneQlty_ID});
                s.HasOne(s => s.ItemMst).WithMany(s => s.StoneMsts).HasForeignKey(s => s.Style_Code);
                s.HasOne(s => s.StoneQltyMst).WithMany(s => s.StoneMsts).HasForeignKey(s => s.StoneQlty_ID);
            });

            //8
            modelBuilder.Entity<StoneQltyMst>(sq =>
            {
                sq.HasKey(st => st.StoneQlty_ID);
                sq.HasMany(st => st.StoneMsts).WithOne(st => st.StoneQltyMst).HasForeignKey(st => st.StoneQlty_ID);
            });

            //9
            modelBuilder.Entity<ItemMst>(it =>
            {
                it.HasKey(it => it.Style_Code);
                it.HasMany(it => it.StoneMsts).WithOne(it => it.ItemMst).HasForeignKey(it => it.Style_Code);
                it.HasMany(it => it.OrderDetailMsts).WithOne(it => it.ItemMst).HasForeignKey(it => it.Style_Code);
                it.HasMany(it => it.CartLists).WithOne(it => it.ItemMst).HasForeignKey(it => it.Style_Code);
                it.HasMany(it => it.DimMsts).WithOne(it => it.ItemMst).HasForeignKey(it => it.Style_Code);
                it.HasOne(it => it.BrandMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.Brand_ID);  
                it.HasOne(it => it.CatMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.Cat_ID);
                it.HasOne(it => it.CertifyMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.Certify_ID);
                it.HasOne(it => it.ProdMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.Prod_ID);
                it.HasOne(it => it.GoldKrtMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.GoldType_ID);
                it.HasOne(it => it.JewelTypeMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.Jewellery_ID);
            });

            //10
            modelBuilder.Entity<DimMst>(d =>
            {
                d.HasKey(d => new {d.Style_Code, d.DimQlty_ID});
                d.HasOne(d => d.ItemMst).WithMany(d => d.DimMsts).HasForeignKey(d => d.Style_Code);
                d.HasOne(d => d.DimQltySubMst).WithMany(d => d.DimMsts).HasForeignKey(d => d.DimQlty_ID);
                d.HasOne(d => d.DimQltyMst).WithMany(d => d.DimMsts).HasForeignKey(d => d.DimQlty_ID);
                d.HasOne(d => d.DimInfoMst).WithOne(d => d.DimMst).HasForeignKey<DimInfoMst>(d => d.DimID);
            });

            //11
            modelBuilder.Entity<DimQltyMst>(d =>
            {
                d.HasKey(d => d.DimQlty_ID);
                d.HasMany(d => d.DimMsts).WithOne(d => d.DimQltyMst).HasForeignKey(d => d.DimQlty_ID);
            });

            //12
            modelBuilder.Entity<DimQltySubMst>(d =>
            {
                d.HasKey(d => d.DimSubType_ID);
                d.HasMany(d => d.DimMsts).WithOne(d => d.DimQltySubMst).HasForeignKey(d => d.DimSubType_ID);
            }); 

            //13
            modelBuilder.Entity<DimInfoMst>(d =>
            {
                d.HasKey(d => d.DimID);
                d.HasOne(d => d.DimMst).WithOne(d => d.DimInfoMst).HasForeignKey<DimMst>(d => d.DimID);
            }); 

            //14
            modelBuilder.Entity<BrandMst>(b =>
            {
                b.HasKey(b => b.Brand_ID);
                b.HasMany(b => b.ItemMsts).WithOne(b => b.BrandMst).HasForeignKey(b => b.Brand_ID);
            });

            //15
            modelBuilder.Entity<CatMst>(c =>
            {
                c.HasKey(c => c.Cat_ID);
                c.HasMany(c => c.ItemMsts).WithOne(c => c.CatMst).HasForeignKey(c => c.Cat_ID);
            });

            //16
            modelBuilder.Entity<CertifyMst>(c =>
            {
                c.HasKey(c => c.Certify_ID);
                c.HasMany(c => c.ItemMsts).WithOne(c => c.CertifyMst).HasForeignKey(c => c.Certify_ID);
            });

            //17
            modelBuilder.Entity<GoldKrtMst>(g =>
            {
                g.HasKey(g => g.GoldType_ID);
                g.HasMany(g => g.ItemMsts).WithOne(g => g.GoldKrtMst).HasForeignKey(g => g.GoldType_ID);
            });

            //18
            modelBuilder.Entity<ProdMst>(p =>
            {
                p.HasKey(p => p.Prod_ID);
                p.HasMany(p => p.ItemMsts).WithOne(p => p.ProdMst).HasForeignKey(p => p.Prod_ID);
            });

            //19
            modelBuilder.Entity<JewelTypeMst>(j =>
            {
                j.HasKey(j => j.ID);
                j.HasMany(j => j.ItemMsts).WithOne(j => j.JewelTypeMst).HasForeignKey(j => j.Jewellery_ID);
            });
        }
    }
}
