﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Helper;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class ItemMstRepo : IItemMstRepo
    {
        private readonly DatabaseContext db;

        public ItemMstRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<CustomResult> GetAllItemMst()
        {
            try
            {
                var result = await db.ItemMsts.ToListAsync();
                if (result == null)
                {
                    return new CustomResult(401, "Something went wrong", null);
                }
                else if (result.Count == 0) // Sửa lại điều kiện kiểm tra độ dài của danh sách
                {
                    return new CustomResult(204, "List is empty", result); // Thay đổi mã trạng thái 201 thành 204 nếu danh sách trống rỗng
                }
                else
                {
                    return new CustomResult(200, "Get list success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetItemMstById(string id)
        {
            try
            {
                var result = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == id);
                if (result == null)
                {
                    return new CustomResult(401, "not found", null);
                }
                else
                {
                    return new CustomResult(200, "Get item success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> CreateItemMst(ItemMst newItem, IFormFile file)
        {
            try
            {
                try
                {
                    newItem.Style_Code = Guid.NewGuid().ToString();

                    if (file != null)
                    {
                        newItem.ImagePath = FileUpload.SaveImages("itemMstImage", file);
                    }

                    // Thiết lập thời gian tạo và cập nhật
                    newItem.CreatedAt = DateTime.Now;
                    newItem.UpdatedAt = DateTime.Now;

                    // Kiểm tra sự tồn tại
                    var brand = await db.BrandMsts.SingleOrDefaultAsync(b => b.Brand_ID == newItem.Brand_ID);
                    var category = await db.CatMsts.SingleOrDefaultAsync(c => c.Cat_ID == newItem.Cat_ID);
                    var certify = await db.CertifyMsts.SingleOrDefaultAsync(c => c.Certify_ID == newItem.Certify_ID);
                    var product = await db.ProdMsts.SingleOrDefaultAsync(p => p.Prod_ID == newItem.Prod_ID);
                    var goldType = await db.GoldKrtMsts.SingleOrDefaultAsync(g => g.GoldType_ID == newItem.GoldType_ID);
                    var jewellery = await db.JewelTypeMsts.SingleOrDefaultAsync(j => j.ID == newItem.Jewellery_ID);

                    //gán
                    newItem.BrandMst = brand;
                    newItem.CatMst = category;
                    newItem.CertifyMst = certify;
                    newItem.ProdMst = product;
                    newItem.GoldKrtMst = goldType;
                    newItem.JewelTypeMst = jewellery;

                    await db.ItemMsts.AddAsync(newItem);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Create Success", newItem);
                    }
                    else
                    {
                        return new CustomResult(201, "Create Error", null);
                    }
                }
                catch (Exception ex)
                {
                    // Check for specific DbUpdateException for unique constraint violation (e.g., duplicate key)
                    if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                    {
                        FileUpload.DeleteImage(newItem.ImagePath);
                        return new CustomResult(409, "Duplicate entry. Another product with the same key already exists.", null);
                    }

                    FileUpload.DeleteImage(newItem.ImagePath);
                    return new CustomResult(500, ex.Message, null);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }


        public async Task<CustomResult> UpdateItemMst(ItemMst itemMst, IFormFile file)
        {
            try
            {
                var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == itemMst.Style_Code);
                if (item == null)
                {
                    return new CustomResult(201, "Not Found", null);
                }

                //cập nhật thông tin
                item.Style_Code = itemMst.Style_Code;
                item.Product_Name = itemMst.Product_Name;
                item.Brand_ID = itemMst.Brand_ID;
                item.Cat_ID = itemMst.Cat_ID;
                item.Certify_ID = itemMst.Certify_ID;
                item.Prod_ID = itemMst.Prod_ID;
                item.GoldType_ID = itemMst.GoldType_ID;
                item.Jewellery_ID = itemMst.Jewellery_ID;
                item.Gold_Wt = itemMst.Gold_Wt;
                item.Wstg_Per = itemMst.Wstg_Per;
                item.Wstg = itemMst.Wstg;
                item.Tot_Gross_Wt = itemMst.Tot_Gross_Wt;
                item.Gold_Rate = itemMst.Gold_Rate;
                item.Gold_Amt = itemMst.Gold_Amt;
                item.Gold_Making = itemMst.Gold_Making;
                item.Stone_Making = itemMst.Stone_Making;
                item.Other_Making = itemMst.Other_Making;
                item.Tot_Making = itemMst.Tot_Making;
                item.MRP = itemMst.MRP;

                //cập nhật thời gian cập nhật
                item.UpdatedAt = DateTime.Now;

                if (file != null)
                {
                    item.ImagePath = FileUpload.SaveImages("itemMstImage", file);
                }

                // Kiểm tra sự tồn tại
                var brand = await db.BrandMsts.SingleOrDefaultAsync(b => b.Brand_ID == item.Brand_ID);
                var category = await db.CatMsts.SingleOrDefaultAsync(c => c.Cat_ID == item.Cat_ID);
                var certify = await db.CertifyMsts.SingleOrDefaultAsync(c => c.Certify_ID == item.Certify_ID);
                var product = await db.ProdMsts.SingleOrDefaultAsync(p => p.Prod_ID == item.Prod_ID);
                var goldType = await db.GoldKrtMsts.SingleOrDefaultAsync(g => g.GoldType_ID == item.GoldType_ID);
                var jewellery = await db.JewelTypeMsts.SingleOrDefaultAsync(j => j.ID == item.Jewellery_ID);

                //gán
                item.BrandMst = brand;
                item.CatMst = category;
                item.CertifyMst = certify;
                item.ProdMst = product;
                item.GoldKrtMst = goldType;
                item.JewelTypeMst = jewellery;

                //cập nhật item
                db.ItemMsts.Update(item);
                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "Update Success", item);
                }
                else
                {
                    return new CustomResult(201, "No changes were made in the database", null);
                }
            }
            catch (Exception ex)
            {
                // Check for specific DbUpdateException for unique constraint violation (e.g., duplicate key)
                if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                {
                    FileUpload.DeleteImage(itemMst.ImagePath);
                    return new CustomResult(409, "Duplicate entry. Another product with the same key already exists.", null);
                }

                FileUpload.DeleteImage(itemMst.ImagePath);
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> DeleteItemMst(string id)
        {
            try
            {
                var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == id);
                if (item == null)
                {
                    return new CustomResult(201, "Not Found", null);
                }
                else
                {
                    db.ItemMsts.Remove(item);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Delete Success", item);
                    }
                    return new CustomResult(201, "Delete Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(402, ex.Message, null);
            }
        }

        public async Task<CustomResult> UpdateVisibility(string id)
        {
            try
            {
                var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == id);
                if (item == null)
                {
                    return new CustomResult(201, "Not Found", null);
                }
                else
                {
                    try
                    {
                        item.Visible = !item.Visible;

                        db.ItemMsts.Update(item);

                        var result = await db.SaveChangesAsync();
                        if (result == 1)
                        {
                            return new CustomResult(200, "Update Success", item);
                        }
                        return new CustomResult(201, "No changes were made in the database", null);
                    }
                    catch (Exception ex)
                    {
                        // Check for specific DbUpdateException for unique constraint violation (e.g., duplicate key)
                        if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                        {
                            return new CustomResult(409, "Duplicate entry. Another product with the same key already exists.", null);
                        }

                        return new CustomResult(500, ex.Message, null);
                    }
                }
            }
            catch (Exception e)
            {
                return new CustomResult(402, e.Message, null);
            }
        }
    }
}
