using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto;
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
                a.HasData(new AdminLoginMst[]
                {
                    new AdminLoginMst
                    {
                        UserName = "admin1",
                        Password = "$2a$12$36eo6oF9uDI0Yf3HJqOsgu6yAkQXceqjPw7WPD1Sb3S/rC4nfKnDu",//123
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    },
                    new AdminLoginMst
                    {
                        UserName = "admin2",
                        Password = "$2a$12$36eo6oF9uDI0Yf3HJqOsgu6yAkQXceqjPw7WPD1Sb3S/rC4nfKnDu",//123
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                });
            });

            //2
            modelBuilder.Entity<Inquiry>(i =>
            {
                i.HasKey(i => i.ID);
                i.HasOne(i => i.UserRegMst).WithMany(i => i.Inquiries).HasForeignKey(i => i.UserID);
                i.HasData(new Inquiry[]
                {
                    new Inquiry
                    {
                        ID = "1",
                        UserID = "1",
                        City = "HCM",
                        Comment = "Test 1",
                        Contact = "0123456789",
                        EmailID = "user1@gmail.com",
                        Name = "User 1",
                        Visible = true,
                        Cdate = DateTime.Now
                    },
                    new Inquiry
                    {
                        ID = "2",
                        UserID = "2",
                        City = "HCM",
                        Comment = "Test 2",
                        Contact = "0987654321",
                        EmailID = "user2@gmail.com",
                        Name = "User 2",
                        Visible = true,
                        Cdate = DateTime.Now
                    },
                    new Inquiry
                    {
                        ID = "3",
                        UserID = "3",
                        City = "HCM",
                        Comment = "Test 3",
                        Contact = "0135792468",
                        EmailID = "user3@gmail.com",
                        Name = "User 3",
                        Visible = true,
                        Cdate = DateTime.Now
                    }
                });
            });

            //3
            modelBuilder.Entity<UserRegMst>(u =>
            {
                u.HasKey(u => u.UserID);
                u.HasMany(u => u.CartLists).WithOne(u => u.UserRegMst).HasForeignKey(u => u.UserID);
                u.HasMany(u => u.OrderMsts).WithOne(u => u.UserRegMst).HasForeignKey(u => u.UserID);
                u.HasMany(u => u.Inquiries).WithOne(u => u.UserRegMst).HasForeignKey(u => u.UserID);
                u.HasData(new UserRegMst[]
                {
                    new UserRegMst
                    {
                        UserID = "1",
                        UserName = "user1",
                        UserFname = "User",
                        UserLname = "1",
                        Address = "HCM",
                        City = "HCM",
                        State = "HCM",
                        MobNo = "0123456789",
                        EmailID = "user1@gmail.com",
                        DOB = DateTime.Now,
                        CDate = DateTime.Now,
                        Password = "$2a$12$36eo6oF9uDI0Yf3HJqOsgu6yAkQXceqjPw7WPD1Sb3S/rC4nfKnDu",//123
                        IsVerified = true,
                        Activate = true,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    },
                    new UserRegMst
                    {
                        UserID = "2",
                        UserName = "user2",
                        UserFname = "User",
                        UserLname = "2",
                        Address = "HCM",
                        City = "HCM",
                        State = "HCM",
                        MobNo = "0123456789",
                        EmailID = "user2@gmail.com",
                        DOB = DateTime.Now,
                        CDate = DateTime.Now,
                        IsVerified = true,
                        Password = "$2a$12$36eo6oF9uDI0Yf3HJqOsgu6yAkQXceqjPw7WPD1Sb3S/rC4nfKnDu",//123
                        Activate = true,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    },
                    new UserRegMst
                    {
                        UserID = "3",
                        UserName = "user3",
                        UserFname = "User",
                        UserLname = "3",
                        Address = "HCM",
                        City = "HCM",
                        State = "HCM",
                        MobNo = "0123456789",
                        EmailID = "user3@gmail.com",
                        DOB = DateTime.Now,
                        CDate = DateTime.Now,
                        IsVerified = true,
                        Password = "$2a$12$36eo6oF9uDI0Yf3HJqOsgu6yAkQXceqjPw7WPD1Sb3S/rC4nfKnDu",//123
                        Activate = true,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now
                    }
                });
            });

            //4
            modelBuilder.Entity<CartList>(c =>
            {
                c.HasKey(c => c.ID);
                c.HasOne(c => c.UserRegMst).WithMany(c => c.CartLists).HasForeignKey(c => c.UserID);
                c.HasOne(c => c.ItemMst).WithMany(c => c.CartLists).HasForeignKey(c => c.Style_Code);
                c.HasData(new CartList[]
                {
                    new CartList
                    {
                        ID = "1",
                        UserID = "1",
                        Style_Code = "1",
                        Quantity = 1,
                        Product_Name = "Product 1",
                        MRP = 1000
                    },
                    new CartList
                    {
                        ID = "2",
                        UserID = "2",
                        Style_Code = "2",
                        Quantity = 1,
                        Product_Name = "Product 2",
                        MRP = 2000
                    },
                    new CartList
                    {
                        ID = "3",
                        UserID = "3",
                        Style_Code = "3",
                        Quantity = 1,
                        Product_Name = "Product 3",
                        MRP = 1500
                    }
                });
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
                od.HasKey(od => new { od.Order_ID, od.Style_Code });
                od.HasOne(od => od.ItemMst).WithMany(od => od.OrderDetailMsts).HasForeignKey(od => od.Style_Code);
                od.HasOne(od => od.OrderMst).WithMany(od => od.OrderDetailMsts).HasForeignKey(od => od.Order_ID);
            });

            //7
            modelBuilder.Entity<StoneMst>(s =>
            {
                s.HasKey(s => s.Stone_ID);
                s.HasOne(s => s.StoneQltyMst).WithMany(s => s.StoneMsts).HasForeignKey(s => s.StoneQlty_ID);
                s.HasData(new StoneMst[]
                {
                    new StoneMst
                    {
                        Stone_ID = "1",
                        StoneQlty_ID = "1",
                        Stone_Gm = 1,
                        Stone_Pcs = 1,
                        Stone_Crt = 1,
                        Stone_Rate = 1000,
                        Stone_Amt = 1000,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                    },
                    new StoneMst
                    {
                        Stone_ID = "2",
                        StoneQlty_ID = "2",
                        Stone_Gm = 2,
                        Stone_Pcs = 2,
                        Stone_Crt = 2,
                        Stone_Rate = 2000,
                        Stone_Amt = 2000,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                    },
                    new StoneMst
                    {
                        Stone_ID = "3",
                        StoneQlty_ID = "3",
                        Stone_Gm = 3,
                        Stone_Pcs = 3,
                        Stone_Crt = 3,
                        Stone_Rate = 1500,
                        Stone_Amt = 1500,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                    }
                });
            });

            //8
            modelBuilder.Entity<StoneQltyMst>(sq =>
            {
                sq.HasKey(st => st.StoneQlty_ID);
                sq.HasMany(st => st.StoneMsts).WithOne(st => st.StoneQltyMst).HasForeignKey(st => st.StoneQlty_ID);
                sq.HasMany(st => st.ItemMsts).WithOne(st => st.StoneQltyMst).HasForeignKey(st => st.StoneQlty_ID);
                sq.HasData(new StoneQltyMst[]
                {
                    new StoneQltyMst
                    {
                        StoneQlty_ID = "1",
                        StoneQlty = "Ruby",
                        Stone_Year = 1913,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Visible = true
                    },
                    new StoneQltyMst
                    {
                        StoneQlty_ID = "2",
                        StoneQlty = "Meena",
                        Stone_Year = 1913,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Visible = true
                    },
                    new StoneQltyMst
                    {
                        StoneQlty_ID = "3",
                        StoneQlty = "Sapphire",
                        Stone_Year = 1913,
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Visible = true
                    }
                });
            });

            //9
            modelBuilder.Entity<ItemMst>(it =>
            {
                it.HasKey(it => it.Style_Code);
                it.HasMany(it => it.OrderDetailMsts).WithOne(it => it.ItemMst).HasForeignKey(it => it.Style_Code);
                it.HasMany(it => it.CartLists).WithOne(it => it.ItemMst).HasForeignKey(it => it.Style_Code);
                it.HasOne(it => it.DimMsts).WithOne(it => it.ItemMst).HasForeignKey<DimMst>(it => it.Style_Code);
                it.HasOne(it => it.BrandMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.Brand_ID);
                it.HasOne(it => it.CatMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.Cat_ID);
                it.HasOne(it => it.CertifyMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.Certify_ID);
                it.HasOne(it => it.ProdMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.Prod_ID);
                it.HasOne(it => it.GoldKrtMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.GoldType_ID);
                it.HasOne(it => it.JewelTypeMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.Jewellery_ID);
                it.HasOne(it => it.StoneQltyMst).WithMany(it => it.ItemMsts).HasForeignKey(it => it.StoneQlty_ID);
                it.HasData(new ItemMst[]
                {
                    new ItemMst
                    {
                        Style_Code = "1",
                        Product_Name = "Product 1",
                        Pairs = 1,
                        Brand_ID = "1",
                        Quantity = 100,
                        Cat_ID = "1",
                        Prod_Quality = "Premium",
                        Certify_ID = "1",
                        Prod_ID = "1",
                        GoldType_ID = "1",
                        Jewellery_ID = "1",
                        StoneQlty_ID = "1",
                        Gold_Wt = 1,
                        Stone_Wt = 1,
                        Net_Gold = 1,
                        Wstg_Per = 1,
                        Wstg = 1,
                        Tot_Gross_Wt = 1,
                        Gold_Rate = 1000,
                        Gold_Amt = 1000,
                        Gold_Making = 1000,
                        Stone_Making = 1000,
                        Other_Making = 1000,
                        Tot_Making = 1000,
                        MRP = 1000,
                        ImagePath = "https://sjc.com.vn/upload/35-nutg0004_1475050374.jpg",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Visible = true
                    },
                    new ItemMst
                    {
                        Style_Code = "2",
                        Product_Name = "Product 2",
                        Pairs = 2,
                        Brand_ID = "2",
                        Quantity = 100,
                        Cat_ID = "2",
                        Prod_Quality = "Standard",
                        Certify_ID = "2",
                        Prod_ID = "2",
                        GoldType_ID = "2",
                        Jewellery_ID = "2",
                        StoneQlty_ID = "2",
                        Gold_Wt = 2,
                        Stone_Wt = 2,
                        Net_Gold = 2,
                        Wstg_Per = 2,
                        Wstg = 2,
                        Tot_Gross_Wt = 2,
                        Gold_Rate = 2000,
                        Gold_Amt = 2000,
                        Gold_Making = 2000,
                        Stone_Making = 2000,
                        Other_Making = 2000,
                        Tot_Making = 2000,
                        MRP = 2000,
                        ImagePath = "https://sjc.com.vn/upload/28-ltdc0096_1475054675.jpg",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Visible = true
                    },
                    new ItemMst
                    {
                        Style_Code = "3",
                        Product_Name = "Product 3",
                        Pairs = 3,
                        Brand_ID = "3",
                        Quantity = 100,
                        Cat_ID = "3",
                        Prod_Quality = "Economy",
                        Certify_ID = "3",
                        Prod_ID = "3",
                        GoldType_ID = "3",
                        Jewellery_ID = "3",
                        StoneQlty_ID = "3",
                        Gold_Wt = 3,
                        Stone_Wt = 3,
                        Net_Gold = 3,
                        Wstg_Per = 3,
                        Wstg = 3,
                        Tot_Gross_Wt = 3,
                        Gold_Rate = 1500,
                        Gold_Amt = 1500,
                        Gold_Making = 1500,
                        Stone_Making = 1500,
                        Other_Making = 1500,
                        Tot_Making = 1500,
                        MRP = 1500,
                        ImagePath = "",
                        CreatedAt = DateTime.Now,
                        UpdatedAt = DateTime.Now,
                        Visible = true
                    }
                });
            });

            //10
            modelBuilder.Entity<DimMst>(d =>
            {
                d.HasKey(d => d.DimMst_ID);
                d.HasOne(d => d.ItemMst).WithOne(d => d.DimMsts).HasForeignKey<DimMst>(d => d.Style_Code);
                d.HasOne(d => d.DimQltySubMst).WithMany(d => d.DimMsts).HasForeignKey(d => d.DimQlty_ID);
                d.HasOne(d => d.DimQltyMst).WithMany(d => d.DimMsts).HasForeignKey(d => d.DimQlty_ID);
                d.HasOne(d => d.DimInfoMst).WithOne(d => d.DimMst).HasForeignKey<DimInfoMst>(d => d.DimID);
                d.HasData(new DimMst[]
                {
                        new DimMst
                        {
                            DimMst_ID = "1",
                            Style_Code = "1",
                            DimQlty_ID = "1",
                            DimSubType_ID = "1",
                            DimID = "1",
                            Dim_Crt = 1,
                            Dim_Pcs = 1,
                            Dim_Gm = 1,
                            Dim_Size = 1,
                            Dim_Rate = 1000,
                            Dim_Amt = 1000,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                        },
                        new DimMst
                        {
                            DimMst_ID = "2",
                            Style_Code = "2",
                            DimQlty_ID = "2",
                            DimSubType_ID = "2",
                            DimID = "2",
                            Dim_Crt = 2,
                            Dim_Pcs = 2,
                            Dim_Gm = 2,
                            Dim_Size = 2,
                            Dim_Rate = 2000,
                            Dim_Amt = 2000,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                        },
                        new DimMst
                        {
                            DimMst_ID = "3",
                            Style_Code = "3",
                            DimQlty_ID = "3",
                            DimSubType_ID = "3",
                            DimID = "3",
                            Dim_Crt = 3,
                            Dim_Pcs = 3,
                            Dim_Gm = 3,
                            Dim_Size = 3,
                            Dim_Rate = 1500,
                            Dim_Amt = 1500,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                        }
                });
            });

            //11
            modelBuilder.Entity<DimQltyMst>(d =>
            {
                d.HasKey(d => d.DimQlty_ID);
                d.HasMany(d => d.DimMsts).WithOne(d => d.DimQltyMst).HasForeignKey(d => d.DimQlty_ID);
                d.HasData(new DimQltyMst[]
                {
                        new DimQltyMst
                        {
                            DimQlty_ID = "1",
                            DimQlty = "AD",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new DimQltyMst
                        {
                            DimQlty_ID = "2",
                            DimQlty = "VS",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new DimQltyMst
                        {
                            DimQlty_ID = "3",
                            DimQlty = "SI",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new DimQltyMst
                        {
                            DimQlty_ID = "4",
                            DimQlty = "FD",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new DimQltyMst
                        {
                            DimQlty_ID = "5",
                            DimQlty = "WS",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        }
                });
            });

            //12
            modelBuilder.Entity<DimQltySubMst>(d =>
            {
                d.HasKey(d => d.DimSubType_ID);
                d.HasMany(d => d.DimMsts).WithOne(d => d.DimQltySubMst).HasForeignKey(d => d.DimSubType_ID);
                d.HasData(new DimQltySubMst[]
                {
                        new DimQltySubMst
                        {
                            DimSubType_ID = "1",
                            DimQlty = "Premium",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new DimQltySubMst
                        {
                            DimSubType_ID = "2",
                            DimQlty = "Standard",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new DimQltySubMst
                        {
                            DimSubType_ID = "3",
                            DimQlty = "Economy",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        }
                });
            });

            //13
            modelBuilder.Entity<DimInfoMst>(d =>
            {
                d.HasKey(d => d.DimID);
                d.HasOne(d => d.DimMst).WithOne(d => d.DimInfoMst).HasForeignKey<DimMst>(d => d.DimID);
                d.HasData(new DimInfoMst[]
                {
                        new DimInfoMst
                        {
                            DimID = "1",
                            DimType = "Diamond",
                            DimSubType = "Premium",
                            DimCrt = "1",
                            DimPrice = "1000",
                            DimImg = "",
                            DimYear = 1913,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new DimInfoMst
                        {
                            DimID = "2",
                            DimType = "Diamond",
                            DimSubType = "Standard",
                            DimCrt = "2",
                            DimPrice = "2000",
                            DimImg = "",
                            DimYear = 1913,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new DimInfoMst
                        {
                            DimID = "3",
                            DimType = "Diamond",
                            DimSubType = "Economy",
                            DimCrt = "3",
                            DimPrice = "1500",
                            DimImg = "",
                            DimYear = 1913,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        }
                });
            });

            //14
            modelBuilder.Entity<BrandMst>(b =>
            {
                b.HasKey(b => b.Brand_ID);
                b.HasMany(b => b.ItemMsts).WithOne(b => b.BrandMst).HasForeignKey(b => b.Brand_ID);
                b.HasData(new BrandMst[]
                {
                        new BrandMst
                        {
                            Brand_ID = "1",
                            Brand_Type = "Asmi",
                            Brand_Year = 1913,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new BrandMst
                        {
                            Brand_ID = "2",
                            Brand_Type = "D’damas",
                            Brand_Year = 1913,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new BrandMst
                        {
                            Brand_ID = "3",
                            Brand_Type = "ABC Jewelers",
                            Brand_Year = 1913,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        }
                });
            });

            //15
            modelBuilder.Entity<CatMst>(c =>
            {
                c.HasKey(c => c.Cat_ID);
                c.HasMany(c => c.ItemMsts).WithOne(c => c.CatMst).HasForeignKey(c => c.Cat_ID);
                c.HasData(new CatMst[]
                {
                        new CatMst
                        {
                            Cat_ID = "1",
                            Cat_Name = "Silver Jewelry",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new CatMst
                        {
                            Cat_ID = "2",
                            Cat_Name = "Gold Jewelry",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new CatMst
                        {
                            Cat_ID = "3",
                            Cat_Name = "Diamond Jewelry",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        }
                });
            });

            //16
            modelBuilder.Entity<CertifyMst>(c =>
            {
                c.HasKey(c => c.Certify_ID);
                c.HasMany(c => c.ItemMsts).WithOne(c => c.CertifyMst).HasForeignKey(c => c.Certify_ID);
                c.HasData(new CertifyMst[]
                {
                        new CertifyMst
                        {
                            Certify_ID = "1",
                            Certify_Type = "BIS Hallmark",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new CertifyMst
                        {
                            Certify_ID = "2",
                            Certify_Type = "IGI",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new CertifyMst
                        {
                            Certify_ID = "3",
                            Certify_Type = "GIA",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        }
                });
            });

            //17
            modelBuilder.Entity<GoldKrtMst>(g =>
            {
                g.HasKey(g => g.GoldType_ID);
                g.HasMany(g => g.ItemMsts).WithOne(g => g.GoldKrtMst).HasForeignKey(g => g.GoldType_ID);
                g.HasData(new GoldKrtMst[]
                {
                        new GoldKrtMst
                        {
                            GoldType_ID = "1",
                            Gold_Crt = "18K",
                            Gold_Year = 1913,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new GoldKrtMst
                        {
                            GoldType_ID = "2",
                            Gold_Crt = "22K",
                            Gold_Year = 1913,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new GoldKrtMst
                        {
                            GoldType_ID = "3",
                            Gold_Crt = "24K",
                            Gold_Year = 1913,
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        }
                });

            });

            //18
            modelBuilder.Entity<ProdMst>(p =>
            {
                p.HasKey(p => p.Prod_ID);
                p.HasMany(p => p.ItemMsts).WithOne(p => p.ProdMst).HasForeignKey(p => p.Prod_ID);
                p.HasData(new ProdMst[]
                {
                        new ProdMst
                        {
                            Prod_ID = "1",
                            Prod_Type = "Gold Ring",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new ProdMst
                        {
                            Prod_ID = "2",
                            Prod_Type = "Diamond Earring",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new ProdMst
                        {
                            Prod_ID = "3",
                            Prod_Type = "Silver Necklace",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new ProdMst
                        {
                            Prod_ID = "4",
                            Prod_Type = "Silver Ring",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        }
                });
            });

            //19
            modelBuilder.Entity<JewelTypeMst>(j =>
            {
                j.HasKey(j => j.Jewellery_ID);
                j.HasMany(j => j.ItemMsts).WithOne(j => j.JewelTypeMst).HasForeignKey(j => j.Jewellery_ID);
                j.HasData(new JewelTypeMst[]
                {
                        new JewelTypeMst
                        {
                            Jewellery_ID = "1",
                            Jewellery_Type = "Ring",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new JewelTypeMst
                        {
                            Jewellery_ID = "2",
                            Jewellery_Type = "Earring",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new JewelTypeMst
                        {
                            Jewellery_ID = "3",
                            Jewellery_Type = "Necklace",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        },
                        new JewelTypeMst
                        {
                            Jewellery_ID = "4",
                            Jewellery_Type = "Bracelet",
                            CreatedAt = DateTime.Now,
                            UpdatedAt = DateTime.Now,
                            Visible = true
                        }
                });
            });
        }
    }
}
