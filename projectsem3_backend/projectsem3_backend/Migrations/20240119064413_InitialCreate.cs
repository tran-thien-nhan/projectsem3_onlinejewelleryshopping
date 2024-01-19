using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

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
                    Password = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
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
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    Cat_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    Certify_Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    DimImg = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    DimQlty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    DimQlty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    Gold_Crt = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    Jewellery_Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    Prod_Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    StoneQlty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
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
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    Cdate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    Quantity = table.Column<int>(type: "int", nullable: false),
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
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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
                    Stone_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: false)
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

            migrationBuilder.InsertData(
                table: "AdminLoginMsts",
                columns: new[] { "UserName", "CreatedAt", "Password", "UpdatedAt" },
                values: new object[,]
                {
                    { "admin1", new DateTime(2024, 1, 19, 13, 44, 13, 73, DateTimeKind.Local).AddTicks(713), "123", new DateTime(2024, 1, 19, 13, 44, 13, 73, DateTimeKind.Local).AddTicks(725) },
                    { "admin2", new DateTime(2024, 1, 19, 13, 44, 13, 73, DateTimeKind.Local).AddTicks(726), "123", new DateTime(2024, 1, 19, 13, 44, 13, 73, DateTimeKind.Local).AddTicks(727) }
                });

            migrationBuilder.InsertData(
                table: "BrandMsts",
                columns: new[] { "Brand_ID", "Brand_Type", "CreatedAt", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", "Asmi", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8292), new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8297), true },
                    { "2", "D’damas", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8299), new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8299), true },
                    { "3", "ABC Jewelers", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8301), new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8302), true }
                });

            migrationBuilder.InsertData(
                table: "CatMsts",
                columns: new[] { "Cat_ID", "Cat_Name", "CreatedAt", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", "Silver Jewelry", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8942), new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8944), true },
                    { "2", "Gold Jewelry", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8947), new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8947), true },
                    { "3", "Diamond Jewelry", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8958), new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(8959), true }
                });

            migrationBuilder.InsertData(
                table: "CertifyMsts",
                columns: new[] { "Certify_ID", "Certify_Type", "CreatedAt", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", "BIS Hallmark", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9414), new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9416), true },
                    { "2", "IGI", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9418), new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9418), true },
                    { "3", "GIA", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9420), new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9420), true }
                });

            migrationBuilder.InsertData(
                table: "DimInfoMsts",
                columns: new[] { "DimID", "CreatedAt", "DimCrt", "DimImg", "DimPrice", "DimSubType", "DimType", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(6798), "1", "", "1000", "Premium", "Diamond", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(6810), true },
                    { "2", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(6813), "2", "", "2000", "Standard", "Diamond", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(6814), true },
                    { "3", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(6816), "3", "", "1500", "Economy", "Diamond", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(6817), true }
                });

            migrationBuilder.InsertData(
                table: "DimQltyMsts",
                columns: new[] { "DimQlty_ID", "CreatedAt", "DimQlty", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5803), "AD", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5805), true },
                    { "2", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5808), "VS", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5809), true },
                    { "3", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5810), "SI", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5811), true },
                    { "4", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5812), "FD", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5813), true },
                    { "5", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5814), "WS", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5815), true }
                });

            migrationBuilder.InsertData(
                table: "DimQltySubMsts",
                columns: new[] { "DimSubType_ID", "CreatedAt", "DimQlty", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(9561), "Premium", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(9565), true },
                    { "2", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(9568), "Standard", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(9569), true },
                    { "3", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(9570), "Economy", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(9571), true }
                });

            migrationBuilder.InsertData(
                table: "GoldKrtMsts",
                columns: new[] { "GoldType_ID", "CreatedAt", "Gold_Crt", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9887), "18K", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9889), true },
                    { "2", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9891), "22K", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9892), true },
                    { "3", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9893), "24K", new DateTime(2024, 1, 19, 13, 44, 13, 86, DateTimeKind.Local).AddTicks(9894), true }
                });

            migrationBuilder.InsertData(
                table: "JewelTypeMsts",
                columns: new[] { "ID", "CreatedAt", "Jewellery_Type", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(803), "Ring", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(804), true },
                    { "2", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(806), "Earring", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(807), true },
                    { "3", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(809), "Necklace", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(809), true },
                    { "4", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(811), "Bracelet", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(811), true }
                });

            migrationBuilder.InsertData(
                table: "ProdMsts",
                columns: new[] { "Prod_ID", "CreatedAt", "Prod_Type", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(358), "Gold Ring", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(360), true },
                    { "2", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(362), "Diamond Earring", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(363), true },
                    { "3", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(365), "Silver Necklace", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(366), true },
                    { "4", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(367), "Silver Ring", new DateTime(2024, 1, 19, 13, 44, 13, 87, DateTimeKind.Local).AddTicks(368), true }
                });

            migrationBuilder.InsertData(
                table: "StoneQltyMsts",
                columns: new[] { "StoneQlty_ID", "CreatedAt", "StoneQlty", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(2996), "Ruby", new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(2999), true },
                    { "2", new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(3003), "Meena", new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(3004), true },
                    { "3", new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(3005), "Sapphire", new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(3006), true }
                });

            migrationBuilder.InsertData(
                table: "UserRegMsts",
                columns: new[] { "UserID", "Address", "CDate", "City", "CreatedAt", "DOB", "EmailID", "MobNo", "Password", "State", "UpdatedAt", "UserFname", "UserLname" },
                values: new object[,]
                {
                    { "1", "HCM", "01/01/2000", "HCM", new DateTime(2024, 1, 19, 13, 44, 13, 74, DateTimeKind.Local).AddTicks(5715), "01/01/2000", "user1@gmail.com", "0123456789", "123", "HCM", new DateTime(2024, 1, 19, 13, 44, 13, 74, DateTimeKind.Local).AddTicks(5726), "User", "1" },
                    { "2", "HCM", "01/01/2000", "HCM", new DateTime(2024, 1, 19, 13, 44, 13, 74, DateTimeKind.Local).AddTicks(5730), "01/01/2000", "user2@gmail.com", "0123456789", "123", "HCM", new DateTime(2024, 1, 19, 13, 44, 13, 74, DateTimeKind.Local).AddTicks(5731), "User", "2" },
                    { "3", "HCM", "01/01/2000", "HCM", new DateTime(2024, 1, 19, 13, 44, 13, 74, DateTimeKind.Local).AddTicks(5734), "01/01/2000", "user3@gmail.com", "0123456789", "123", "HCM", new DateTime(2024, 1, 19, 13, 44, 13, 74, DateTimeKind.Local).AddTicks(5735), "User", "3" }
                });

            migrationBuilder.InsertData(
                table: "Inquiries",
                columns: new[] { "ID", "Cdate", "City", "Comment", "Contact", "EmailID", "Name", "UserID", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 19, 13, 44, 13, 73, DateTimeKind.Local).AddTicks(5107), "HCM", "Test 1", "0123456789", "user1@gmail.com", "User 1", "1", true },
                    { "2", new DateTime(2024, 1, 19, 13, 44, 13, 73, DateTimeKind.Local).AddTicks(5112), "HCM", "Test 2", "0987654321", "user2@gmail.com", "User 2", "2", true },
                    { "3", new DateTime(2024, 1, 19, 13, 44, 13, 73, DateTimeKind.Local).AddTicks(5114), "HCM", "Test 3", "0135792468", "user3@gmail.com", "User 3", "3", true }
                });

            migrationBuilder.InsertData(
                table: "ItemMsts",
                columns: new[] { "Style_Code", "Brand_ID", "Cat_ID", "Certify_ID", "CreatedAt", "GoldType_ID", "Gold_Amt", "Gold_Making", "Gold_Rate", "Gold_Wt", "ImagePath", "Jewellery_ID", "MRP", "Net_Gold", "Other_Making", "Pairs", "Prod_ID", "Prod_Quality", "Product_Name", "Quantity", "Stone_Making", "Stone_Wt", "Tot_Gross_Wt", "Tot_Making", "UpdatedAt", "Visible", "Wstg", "Wstg_Per" },
                values: new object[,]
                {
                    { "1", "1", "1", "1", new DateTime(2024, 1, 19, 13, 44, 13, 82, DateTimeKind.Local).AddTicks(4801), "1", 1000m, 1000m, 1000m, 1m, "", "1", 1000m, 1m, 1000m, 1, "1", "Premium", "Product 1", 1, 1000m, 1m, 1m, 1000m, new DateTime(2024, 1, 19, 13, 44, 13, 82, DateTimeKind.Local).AddTicks(4814), true, 1m, 1m },
                    { "2", "2", "2", "2", new DateTime(2024, 1, 19, 13, 44, 13, 82, DateTimeKind.Local).AddTicks(4821), "2", 2000m, 2000m, 2000m, 2m, "", "2", 2000m, 2m, 2000m, 2, "2", "Standard", "Product 2", 2, 2000m, 2m, 2m, 2000m, new DateTime(2024, 1, 19, 13, 44, 13, 82, DateTimeKind.Local).AddTicks(4822), true, 2m, 2m },
                    { "3", "3", "3", "3", new DateTime(2024, 1, 19, 13, 44, 13, 82, DateTimeKind.Local).AddTicks(4827), "3", 1500m, 1500m, 1500m, 3m, "", "3", 1500m, 3m, 1500m, 3, "3", "Economy", "Product 3", 3, 1500m, 3m, 3m, 1500m, new DateTime(2024, 1, 19, 13, 44, 13, 82, DateTimeKind.Local).AddTicks(4828), true, 3m, 3m }
                });

            migrationBuilder.InsertData(
                table: "CartLists",
                columns: new[] { "ID", "MRP", "Product_Name", "Quantity", "Style_Code", "UserID" },
                values: new object[,]
                {
                    { "1", 1000m, "Product 1", 1, "1", "1" },
                    { "2", 2000m, "Product 2", 1, "2", "2" },
                    { "3", 1500m, "Product 3", 1, "3", "3" }
                });

            migrationBuilder.InsertData(
                table: "DimMsts",
                columns: new[] { "DimQlty_ID", "Style_Code", "CreatedAt", "DimID", "DimSubType_ID", "Dim_Amt", "Dim_Crt", "Dim_Gm", "Dim_Pcs", "Dim_Rate", "Dim_Size", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", "1", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5128), "1", "1", 1000m, 1m, 1m, 1m, 1000m, 1m, new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5138), false },
                    { "2", "2", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5143), "2", "2", 2000m, 2m, 2m, 2m, 2000m, 2m, new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5143), false },
                    { "3", "3", new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5148), "3", "3", 1500m, 3m, 3m, 3m, 1500m, 3m, new DateTime(2024, 1, 19, 13, 44, 13, 84, DateTimeKind.Local).AddTicks(5148), false }
                });

            migrationBuilder.InsertData(
                table: "StoneMsts",
                columns: new[] { "StoneQlty_ID", "Style_Code", "CreatedAt", "Stone_Amt", "Stone_Crt", "Stone_Gm", "Stone_Pcs", "Stone_Rate", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", "1", new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(2462), 1000m, 1m, 1m, 1m, 1000m, new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(2474), false },
                    { "2", "2", new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(2477), 2000m, 2m, 2m, 2m, 2000m, new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(2478), false },
                    { "3", "3", new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(2480), 1500m, 3m, 3m, 3m, 1500m, new DateTime(2024, 1, 19, 13, 44, 13, 77, DateTimeKind.Local).AddTicks(2481), false }
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
