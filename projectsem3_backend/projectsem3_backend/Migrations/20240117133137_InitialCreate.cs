using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace projectsem3_backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminLoginMsts",
                columns: table => new
                {
                    UserName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminLoginMsts", x => x.UserName);
                });

            migrationBuilder.CreateTable(
                name: "BrandMsts",
                columns: table => new
                {
                    Brand_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Brand_Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BrandMsts", x => x.Brand_ID);
                });

            migrationBuilder.CreateTable(
                name: "CatMsts",
                columns: table => new
                {
                    Cat_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Cat_Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatMsts", x => x.Cat_ID);
                });

            migrationBuilder.CreateTable(
                name: "CertifyMsts",
                columns: table => new
                {
                    Certify_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Certify_Type = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CertifyMsts", x => x.Certify_ID);
                });

            migrationBuilder.CreateTable(
                name: "DimInfoMsts",
                columns: table => new
                {
                    DimID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DimType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DimSubType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DimCrt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DimPrice = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DimImg = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimInfoMsts", x => x.DimID);
                });

            migrationBuilder.CreateTable(
                name: "DimQltyMsts",
                columns: table => new
                {
                    DimQlty_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DimQlty = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimQltyMsts", x => x.DimQlty_ID);
                });

            migrationBuilder.CreateTable(
                name: "DimQltySubMsts",
                columns: table => new
                {
                    DimSubType_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DimQlty = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimQltySubMsts", x => x.DimSubType_ID);
                });

            migrationBuilder.CreateTable(
                name: "GoldKrtMsts",
                columns: table => new
                {
                    GoldType_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Gold_Crt = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoldKrtMsts", x => x.GoldType_ID);
                });

            migrationBuilder.CreateTable(
                name: "JewelTypeMsts",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Jewellery_Type = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JewelTypeMsts", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ProdMsts",
                columns: table => new
                {
                    Prod_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Prod_Type = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdMsts", x => x.Prod_ID);
                });

            migrationBuilder.CreateTable(
                name: "StoneQltyMsts",
                columns: table => new
                {
                    StoneQlty_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StoneQlty = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoneQltyMsts", x => x.StoneQlty_ID);
                });

            migrationBuilder.CreateTable(
                name: "UserRegMsts",
                columns: table => new
                {
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserFname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserLname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MobNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DOB = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRegMsts", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "ItemMsts",
                columns: table => new
                {
                    Style_Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Product_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pairs = table.Column<int>(type: "int", nullable: false),
                    Brand_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Cat_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Prod_Quality = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Certify_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Prod_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    GoldType_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Jewellery_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Gold_Wt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Stone_Wt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Net_Gold = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Wstg_Per = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Wstg = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Tot_Gross_Wt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Gold_Rate = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Gold_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Gold_Making = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Stone_Making = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Other_Making = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Tot_Making = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    MRP = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemMsts", x => x.Style_Code);
                    table.ForeignKey(
                        name: "FK_ItemMsts_BrandMsts_Brand_ID",
                        column: x => x.Brand_ID,
                        principalTable: "BrandMsts",
                        principalColumn: "Brand_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemMsts_CatMsts_Cat_ID",
                        column: x => x.Cat_ID,
                        principalTable: "CatMsts",
                        principalColumn: "Cat_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemMsts_CertifyMsts_Certify_ID",
                        column: x => x.Certify_ID,
                        principalTable: "CertifyMsts",
                        principalColumn: "Certify_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemMsts_GoldKrtMsts_GoldType_ID",
                        column: x => x.GoldType_ID,
                        principalTable: "GoldKrtMsts",
                        principalColumn: "GoldType_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemMsts_JewelTypeMsts_Jewellery_ID",
                        column: x => x.Jewellery_ID,
                        principalTable: "JewelTypeMsts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemMsts_ProdMsts_Prod_ID",
                        column: x => x.Prod_ID,
                        principalTable: "ProdMsts",
                        principalColumn: "Prod_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Inquiries",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailID = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cdate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inquiries", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Inquiries_UserRegMsts_UserID",
                        column: x => x.UserID,
                        principalTable: "UserRegMsts",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderMsts",
                columns: table => new
                {
                    Order_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Order_Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Order_Note = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderStatus = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderMsts", x => x.Order_ID);
                    table.ForeignKey(
                        name: "FK_OrderMsts_UserRegMsts_UserID",
                        column: x => x.UserID,
                        principalTable: "UserRegMsts",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CartLists",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Style_Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Product_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MRP = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartLists", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CartLists_ItemMsts_Style_Code",
                        column: x => x.Style_Code,
                        principalTable: "ItemMsts",
                        principalColumn: "Style_Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartLists_UserRegMsts_UserID",
                        column: x => x.UserID,
                        principalTable: "UserRegMsts",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DimMsts",
                columns: table => new
                {
                    Style_Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DimQlty_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DimSubType_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DimID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Dim_Crt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Dim_Pcs = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Dim_Gm = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Dim_Size = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Dim_Rate = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Dim_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimMsts", x => new { x.Style_Code, x.DimQlty_ID });
                    table.ForeignKey(
                        name: "FK_DimMsts_DimInfoMsts_DimID",
                        column: x => x.DimID,
                        principalTable: "DimInfoMsts",
                        principalColumn: "DimID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DimMsts_DimQltyMsts_DimQlty_ID",
                        column: x => x.DimQlty_ID,
                        principalTable: "DimQltyMsts",
                        principalColumn: "DimQlty_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DimMsts_DimQltySubMsts_DimSubType_ID",
                        column: x => x.DimSubType_ID,
                        principalTable: "DimQltySubMsts",
                        principalColumn: "DimSubType_ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DimMsts_ItemMsts_Style_Code",
                        column: x => x.Style_Code,
                        principalTable: "ItemMsts",
                        principalColumn: "Style_Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StoneMsts",
                columns: table => new
                {
                    Style_Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StoneQlty_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Stone_Gm = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Stone_Pcs = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Stone_Crt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Stone_Rate = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Stone_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoneMsts", x => new { x.Style_Code, x.StoneQlty_ID });
                    table.ForeignKey(
                        name: "FK_StoneMsts_ItemMsts_Style_Code",
                        column: x => x.Style_Code,
                        principalTable: "ItemMsts",
                        principalColumn: "Style_Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StoneMsts_StoneQltyMsts_StoneQlty_ID",
                        column: x => x.StoneQlty_ID,
                        principalTable: "StoneQltyMsts",
                        principalColumn: "StoneQlty_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderDetailMsts",
                columns: table => new
                {
                    Order_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Style_Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Product_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Gold_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Stone_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Making_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Total_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderDetailMsts", x => new { x.Order_ID, x.Style_Code });
                    table.ForeignKey(
                        name: "FK_OrderDetailMsts_ItemMsts_Style_Code",
                        column: x => x.Style_Code,
                        principalTable: "ItemMsts",
                        principalColumn: "Style_Code",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderDetailMsts_OrderMsts_Order_ID",
                        column: x => x.Order_ID,
                        principalTable: "OrderMsts",
                        principalColumn: "Order_ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartLists_Style_Code",
                table: "CartLists",
                column: "Style_Code");

            migrationBuilder.CreateIndex(
                name: "IX_CartLists_UserID",
                table: "CartLists",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_DimMsts_DimID",
                table: "DimMsts",
                column: "DimID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DimMsts_DimQlty_ID",
                table: "DimMsts",
                column: "DimQlty_ID");

            migrationBuilder.CreateIndex(
                name: "IX_DimMsts_DimSubType_ID",
                table: "DimMsts",
                column: "DimSubType_ID");

            migrationBuilder.CreateIndex(
                name: "IX_Inquiries_UserID",
                table: "Inquiries",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_ItemMsts_Brand_ID",
                table: "ItemMsts",
                column: "Brand_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ItemMsts_Cat_ID",
                table: "ItemMsts",
                column: "Cat_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ItemMsts_Certify_ID",
                table: "ItemMsts",
                column: "Certify_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ItemMsts_GoldType_ID",
                table: "ItemMsts",
                column: "GoldType_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ItemMsts_Jewellery_ID",
                table: "ItemMsts",
                column: "Jewellery_ID");

            migrationBuilder.CreateIndex(
                name: "IX_ItemMsts_Prod_ID",
                table: "ItemMsts",
                column: "Prod_ID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetailMsts_Style_Code",
                table: "OrderDetailMsts",
                column: "Style_Code");

            migrationBuilder.CreateIndex(
                name: "IX_OrderMsts_UserID",
                table: "OrderMsts",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_StoneMsts_StoneQlty_ID",
                table: "StoneMsts",
                column: "StoneQlty_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminLoginMsts");

            migrationBuilder.DropTable(
                name: "CartLists");

            migrationBuilder.DropTable(
                name: "DimMsts");

            migrationBuilder.DropTable(
                name: "Inquiries");

            migrationBuilder.DropTable(
                name: "OrderDetailMsts");

            migrationBuilder.DropTable(
                name: "StoneMsts");

            migrationBuilder.DropTable(
                name: "DimInfoMsts");

            migrationBuilder.DropTable(
                name: "DimQltyMsts");

            migrationBuilder.DropTable(
                name: "DimQltySubMsts");

            migrationBuilder.DropTable(
                name: "OrderMsts");

            migrationBuilder.DropTable(
                name: "ItemMsts");

            migrationBuilder.DropTable(
                name: "StoneQltyMsts");

            migrationBuilder.DropTable(
                name: "UserRegMsts");

            migrationBuilder.DropTable(
                name: "BrandMsts");

            migrationBuilder.DropTable(
                name: "CatMsts");

            migrationBuilder.DropTable(
                name: "CertifyMsts");

            migrationBuilder.DropTable(
                name: "GoldKrtMsts");

            migrationBuilder.DropTable(
                name: "JewelTypeMsts");

            migrationBuilder.DropTable(
                name: "ProdMsts");
        }
    }
}
