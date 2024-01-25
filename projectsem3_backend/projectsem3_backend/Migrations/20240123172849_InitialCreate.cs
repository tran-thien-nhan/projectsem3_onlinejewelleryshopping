﻿using System;
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
                    UserName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    Brand_Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: true)
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
                    Visible = table.Column<bool>(type: "bit", nullable: true)
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
                    Visible = table.Column<bool>(type: "bit", nullable: true)
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
                    DimSubType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DimCrt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DimPrice = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    DimQlty = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: true)
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
                    DimQlty = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: true)
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
                    Gold_Crt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: true)
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
                    Visible = table.Column<bool>(type: "bit", nullable: true)
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
                    Prod_Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: true)
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
                    StoneQlty = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: true)
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
                    UserFname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserLname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MobNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DOB = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CDate = table.Column<DateTime>(type: "datetime2", nullable: true),
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
                    Product_Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pairs = table.Column<int>(type: "int", nullable: true),
                    Brand_ID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    Cat_ID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Prod_Quality = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Certify_ID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Prod_ID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    GoldType_ID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Jewellery_ID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Gold_Wt = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Stone_Wt = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Net_Gold = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Wstg_Per = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Wstg = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Tot_Gross_Wt = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Gold_Rate = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Gold_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Gold_Making = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Stone_Making = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Other_Making = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Tot_Making = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    MRP = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
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
                        principalColumn: "Brand_ID");
                    table.ForeignKey(
                        name: "FK_ItemMsts_CatMsts_Cat_ID",
                        column: x => x.Cat_ID,
                        principalTable: "CatMsts",
                        principalColumn: "Cat_ID");
                    table.ForeignKey(
                        name: "FK_ItemMsts_CertifyMsts_Certify_ID",
                        column: x => x.Certify_ID,
                        principalTable: "CertifyMsts",
                        principalColumn: "Certify_ID");
                    table.ForeignKey(
                        name: "FK_ItemMsts_GoldKrtMsts_GoldType_ID",
                        column: x => x.GoldType_ID,
                        principalTable: "GoldKrtMsts",
                        principalColumn: "GoldType_ID");
                    table.ForeignKey(
                        name: "FK_ItemMsts_JewelTypeMsts_Jewellery_ID",
                        column: x => x.Jewellery_ID,
                        principalTable: "JewelTypeMsts",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ItemMsts_ProdMsts_Prod_ID",
                        column: x => x.Prod_ID,
                        principalTable: "ProdMsts",
                        principalColumn: "Prod_ID");
                });

            migrationBuilder.CreateTable(
                name: "Inquiries",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Contact = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailID = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cdate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inquiries", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Inquiries_UserRegMsts_UserID",
                        column: x => x.UserID,
                        principalTable: "UserRegMsts",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "OrderMsts",
                columns: table => new
                {
                    Order_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TotalPrice = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Order_Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Order_Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrderStatus = table.Column<int>(type: "int", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderMsts", x => x.Order_ID);
                    table.ForeignKey(
                        name: "FK_OrderMsts_UserRegMsts_UserID",
                        column: x => x.UserID,
                        principalTable: "UserRegMsts",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "CartLists",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Style_Code = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Product_Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    MRP = table.Column<decimal>(type: "decimal(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartLists", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CartLists_ItemMsts_Style_Code",
                        column: x => x.Style_Code,
                        principalTable: "ItemMsts",
                        principalColumn: "Style_Code");
                    table.ForeignKey(
                        name: "FK_CartLists_UserRegMsts_UserID",
                        column: x => x.UserID,
                        principalTable: "UserRegMsts",
                        principalColumn: "UserID");
                });

            migrationBuilder.CreateTable(
                name: "DimMsts",
                columns: table => new
                {
                    Style_Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DimQlty_ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DimSubType_ID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DimID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Dim_Crt = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Dim_Pcs = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Dim_Gm = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Dim_Size = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Dim_Rate = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Dim_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DimMsts", x => new { x.Style_Code, x.DimQlty_ID });
                    table.ForeignKey(
                        name: "FK_DimMsts_DimInfoMsts_DimID",
                        column: x => x.DimID,
                        principalTable: "DimInfoMsts",
                        principalColumn: "DimID");
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
                        principalColumn: "DimSubType_ID");
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
                    Stone_Gm = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Stone_Pcs = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Stone_Crt = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Stone_Rate = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    Stone_Amt = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Visible = table.Column<bool>(type: "bit", nullable: true)
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
                    Product_Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: true),
                    MRP = table.Column<decimal>(type: "decimal(10,2)", nullable: true)
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
                    { "admin1", new DateTime(2024, 1, 24, 0, 28, 48, 665, DateTimeKind.Local).AddTicks(1450), "123", new DateTime(2024, 1, 24, 0, 28, 48, 665, DateTimeKind.Local).AddTicks(1464) },
                    { "admin2", new DateTime(2024, 1, 24, 0, 28, 48, 665, DateTimeKind.Local).AddTicks(1467), "123", new DateTime(2024, 1, 24, 0, 28, 48, 665, DateTimeKind.Local).AddTicks(1468) }
                });

            migrationBuilder.InsertData(
                table: "BrandMsts",
                columns: new[] { "Brand_ID", "Brand_Type", "CreatedAt", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", "Asmi", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(7443), new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(7450), true },
                    { "2", "D’damas", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(7453), new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(7454), true },
                    { "3", "ABC Jewelers", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(7456), new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(7457), true }
                });

            migrationBuilder.InsertData(
                table: "CatMsts",
                columns: new[] { "Cat_ID", "Cat_Name", "CreatedAt", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", "Silver Jewelry", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(8152), new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(8155), true },
                    { "2", "Gold Jewelry", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(8159), new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(8160), true },
                    { "3", "Diamond Jewelry", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(8162), new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(8163), true }
                });

            migrationBuilder.InsertData(
                table: "CertifyMsts",
                columns: new[] { "Certify_ID", "Certify_Type", "CreatedAt", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", "BIS Hallmark", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(1931), new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(1936), true },
                    { "2", "IGI", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(1939), new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(1940), true },
                    { "3", "GIA", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(1943), new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(1944), true }
                });

            migrationBuilder.InsertData(
                table: "DimInfoMsts",
                columns: new[] { "DimID", "CreatedAt", "DimCrt", "DimImg", "DimPrice", "DimSubType", "DimType", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(2612), "1", "", "1000", "Premium", "Diamond", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(2627), true },
                    { "2", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(2632), "2", "", "2000", "Standard", "Diamond", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(2633), true },
                    { "3", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(2635), "3", "", "1500", "Economy", "Diamond", new DateTime(2024, 1, 24, 0, 28, 48, 682, DateTimeKind.Local).AddTicks(2636), true }
                });

            migrationBuilder.InsertData(
                table: "DimQltyMsts",
                columns: new[] { "DimQlty_ID", "CreatedAt", "DimQlty", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(7638), "AD", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(7651), true },
                    { "2", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(7655), "VS", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(7655), true },
                    { "3", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(7658), "SI", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(7659), true },
                    { "4", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(7661), "FD", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(7662), true },
                    { "5", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(7664), "WS", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(7665), true }
                });

            migrationBuilder.InsertData(
                table: "DimQltySubMsts",
                columns: new[] { "DimSubType_ID", "CreatedAt", "DimQlty", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 24, 0, 28, 48, 680, DateTimeKind.Local).AddTicks(5706), "Premium", new DateTime(2024, 1, 24, 0, 28, 48, 680, DateTimeKind.Local).AddTicks(5721), true },
                    { "2", new DateTime(2024, 1, 24, 0, 28, 48, 680, DateTimeKind.Local).AddTicks(5725), "Standard", new DateTime(2024, 1, 24, 0, 28, 48, 680, DateTimeKind.Local).AddTicks(5726), true },
                    { "3", new DateTime(2024, 1, 24, 0, 28, 48, 680, DateTimeKind.Local).AddTicks(5728), "Economy", new DateTime(2024, 1, 24, 0, 28, 48, 680, DateTimeKind.Local).AddTicks(5729), true }
                });

            migrationBuilder.InsertData(
                table: "GoldKrtMsts",
                columns: new[] { "GoldType_ID", "CreatedAt", "Gold_Crt", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(5676), "18K", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(5681), true },
                    { "2", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(5684), "22K", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(5685), true },
                    { "3", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(5687), "24K", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(5688), true }
                });

            migrationBuilder.InsertData(
                table: "JewelTypeMsts",
                columns: new[] { "ID", "CreatedAt", "Jewellery_Type", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 24, 0, 28, 48, 684, DateTimeKind.Local).AddTicks(207), "Ring", new DateTime(2024, 1, 24, 0, 28, 48, 684, DateTimeKind.Local).AddTicks(212), true },
                    { "2", new DateTime(2024, 1, 24, 0, 28, 48, 684, DateTimeKind.Local).AddTicks(215), "Earring", new DateTime(2024, 1, 24, 0, 28, 48, 684, DateTimeKind.Local).AddTicks(216), true },
                    { "3", new DateTime(2024, 1, 24, 0, 28, 48, 684, DateTimeKind.Local).AddTicks(218), "Necklace", new DateTime(2024, 1, 24, 0, 28, 48, 684, DateTimeKind.Local).AddTicks(219), true },
                    { "4", new DateTime(2024, 1, 24, 0, 28, 48, 684, DateTimeKind.Local).AddTicks(221), "Bracelet", new DateTime(2024, 1, 24, 0, 28, 48, 684, DateTimeKind.Local).AddTicks(222), true }
                });

            migrationBuilder.InsertData(
                table: "ProdMsts",
                columns: new[] { "Prod_ID", "CreatedAt", "Prod_Type", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(9521), "Gold Ring", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(9525), true },
                    { "2", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(9530), "Diamond Earring", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(9531), true },
                    { "3", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(9533), "Silver Necklace", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(9534), true },
                    { "4", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(9536), "Silver Ring", new DateTime(2024, 1, 24, 0, 28, 48, 683, DateTimeKind.Local).AddTicks(9537), true }
                });

            migrationBuilder.InsertData(
                table: "StoneQltyMsts",
                columns: new[] { "StoneQlty_ID", "CreatedAt", "StoneQlty", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(9652), "Ruby", new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(9657), true },
                    { "2", new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(9660), "Meena", new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(9661), true },
                    { "3", new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(9663), "Sapphire", new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(9664), true }
                });

            migrationBuilder.InsertData(
                table: "UserRegMsts",
                columns: new[] { "UserID", "Address", "CDate", "City", "CreatedAt", "DOB", "EmailID", "MobNo", "Password", "State", "UpdatedAt", "UserFname", "UserLname" },
                values: new object[,]
                {
                    { "1", "HCM", new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6249), "HCM", new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6251), new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6243), "user1@gmail.com", "0123456789", "123", "HCM", new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6252), "User", "1" },
                    { "2", "HCM", new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6258), "HCM", new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6259), new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6257), "user2@gmail.com", "0123456789", "123", "HCM", new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6260), "User", "2" },
                    { "3", "HCM", new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6263), "HCM", new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6264), new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6263), "user3@gmail.com", "0123456789", "123", "HCM", new DateTime(2024, 1, 24, 0, 28, 48, 666, DateTimeKind.Local).AddTicks(6265), "User", "3" }
                });

            migrationBuilder.InsertData(
                table: "Inquiries",
                columns: new[] { "ID", "Cdate", "City", "Comment", "Contact", "EmailID", "Name", "UserID", "Visible" },
                values: new object[,]
                {
                    { "1", new DateTime(2024, 1, 24, 0, 28, 48, 665, DateTimeKind.Local).AddTicks(7401), "HCM", "Test 1", "0123456789", "user1@gmail.com", "User 1", "1", true },
                    { "2", new DateTime(2024, 1, 24, 0, 28, 48, 665, DateTimeKind.Local).AddTicks(7423), "HCM", "Test 2", "0987654321", "user2@gmail.com", "User 2", "2", true },
                    { "3", new DateTime(2024, 1, 24, 0, 28, 48, 665, DateTimeKind.Local).AddTicks(7426), "HCM", "Test 3", "0135792468", "user3@gmail.com", "User 3", "3", true }
                });

            migrationBuilder.InsertData(
                table: "ItemMsts",
                columns: new[] { "Style_Code", "Brand_ID", "Cat_ID", "Certify_ID", "CreatedAt", "GoldType_ID", "Gold_Amt", "Gold_Making", "Gold_Rate", "Gold_Wt", "ImagePath", "Jewellery_ID", "MRP", "Net_Gold", "Other_Making", "Pairs", "Prod_ID", "Prod_Quality", "Product_Name", "Quantity", "Stone_Making", "Stone_Wt", "Tot_Gross_Wt", "Tot_Making", "UpdatedAt", "Visible", "Wstg", "Wstg_Per" },
                values: new object[,]
                {
                    { "1", "1", "1", "1", new DateTime(2024, 1, 24, 0, 28, 48, 675, DateTimeKind.Local).AddTicks(419), "1", 1000m, 1000m, 1000m, 1m, "https://sjc.com.vn/upload/35-nutg0004_1475050374.jpg", "1", 1000m, 1m, 1000m, 1, "1", "Premium", "Product 1", 100, 1000m, 1m, 1m, 1000m, new DateTime(2024, 1, 24, 0, 28, 48, 675, DateTimeKind.Local).AddTicks(425), true, 1m, 1m },
                    { "2", "2", "2", "2", new DateTime(2024, 1, 24, 0, 28, 48, 675, DateTimeKind.Local).AddTicks(440), "2", 2000m, 2000m, 2000m, 2m, "https://sjc.com.vn/upload/28-ltdc0096_1475054675.jpg", "2", 2000m, 2m, 2000m, 2, "2", "Standard", "Product 2", 100, 2000m, 2m, 2m, 2000m, new DateTime(2024, 1, 24, 0, 28, 48, 675, DateTimeKind.Local).AddTicks(441), true, 2m, 2m },
                    { "3", "3", "3", "3", new DateTime(2024, 1, 24, 0, 28, 48, 675, DateTimeKind.Local).AddTicks(452), "3", 1500m, 1500m, 1500m, 3m, "", "3", 1500m, 3m, 1500m, 3, "3", "Economy", "Product 3", 100, 1500m, 3m, 3m, 1500m, new DateTime(2024, 1, 24, 0, 28, 48, 675, DateTimeKind.Local).AddTicks(453), true, 3m, 3m }
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
                    { "1", "1", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(2780), "1", "1", 1000m, 1m, 1m, 1m, 1000m, 1m, new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(2798), null },
                    { "2", "2", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(2806), "2", "2", 2000m, 2m, 2m, 2m, 2000m, 2m, new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(2807), null },
                    { "3", "3", new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(2815), "3", "3", 1500m, 3m, 3m, 3m, 1500m, 3m, new DateTime(2024, 1, 24, 0, 28, 48, 679, DateTimeKind.Local).AddTicks(2815), null }
                });

            migrationBuilder.InsertData(
                table: "StoneMsts",
                columns: new[] { "StoneQlty_ID", "Style_Code", "CreatedAt", "Stone_Amt", "Stone_Crt", "Stone_Gm", "Stone_Pcs", "Stone_Rate", "UpdatedAt", "Visible" },
                values: new object[,]
                {
                    { "1", "1", new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(6768), 1000m, 1m, 1m, 1m, 1000m, new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(6781), null },
                    { "2", "2", new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(6786), 2000m, 2m, 2m, 2m, 2000m, new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(6787), null },
                    { "3", "3", new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(6792), 1500m, 3m, 3m, 3m, 1500m, new DateTime(2024, 1, 24, 0, 28, 48, 669, DateTimeKind.Local).AddTicks(6792), null }
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
                unique: true,
                filter: "[DimID] IS NOT NULL");

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