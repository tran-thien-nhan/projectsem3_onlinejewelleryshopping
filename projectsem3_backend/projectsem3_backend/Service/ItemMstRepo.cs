using iText.Commons.Actions.Contexts;
using Microsoft.AspNetCore.Mvc;
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

                    //xử lý trùng hình ảnh
                    //var checkImage = await db.ItemMsts.SingleOrDefaultAsync(i => i.ImagePath == newItem.ImagePath);
                    //if (checkImage != null)
                    //{
                    //    FileUpload.DeleteImage(newItem.ImagePath);
                    //    return new CustomResult(409, "Image already exists", null);
                    //}

                    // Thiết lập thời gian tạo và cập nhật
                    newItem.CreatedAt = DateTime.Now;
                    newItem.UpdatedAt = DateTime.Now;

                    // Kiểm tra sự tồn tại
                    var brand = await db.BrandMsts.SingleOrDefaultAsync(b => b.Brand_ID == newItem.Brand_ID);
                    var category = await db.CatMsts.SingleOrDefaultAsync(c => c.Cat_ID == newItem.Cat_ID);
                    var certify = await db.CertifyMsts.SingleOrDefaultAsync(c => c.Certify_ID == newItem.Certify_ID);
                    var product = await db.ProdMsts.SingleOrDefaultAsync(p => p.Prod_ID == newItem.Prod_ID);
                    var goldType = await db.GoldKrtMsts.SingleOrDefaultAsync(g => g.GoldType_ID == newItem.GoldType_ID);
                    var jewellery = await db.JewelTypeMsts.SingleOrDefaultAsync(j => j.Jewellery_ID == newItem.Jewellery_ID);

                    //gán
                    newItem.BrandMst = brand;
                    newItem.CatMst = category;
                    newItem.CertifyMst = certify;
                    newItem.ProdMst = product;
                    newItem.GoldKrtMst = goldType;
                    newItem.JewelTypeMst = jewellery;
                    newItem.Visible = false;

                    // Tính toán
                    newItem.Gold_Rate = newItem.Gold_Rate / 100;
                    newItem.Net_Gold = newItem.Gold_Wt * newItem.Gold_Rate;
                    newItem.Wstg_Per = newItem.Wstg * newItem.Gold_Rate;
                    //total gross weight
                    newItem.Tot_Gross_Wt = newItem.Gold_Wt + newItem.Wstg_Per + newItem.Wstg;
                    //amount of gold in item
                    newItem.Gold_Amt = newItem.Tot_Gross_Wt * newItem.Gold_Rate;
                    //total making charges
                    newItem.Tot_Making = newItem.Gold_Making + newItem.Stone_Making + newItem.Other_Making;
                    //mrp of item (including stone making, gold making and other making)
                    newItem.MRP = newItem.Gold_Wt + newItem.Wstg_Per + newItem.Wstg + newItem.Tot_Gross_Wt + newItem.Gold_Rate + newItem.Gold_Amt + newItem.Gold_Making + newItem.Stone_Making + newItem.Other_Making + newItem.Tot_Making;

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

                //cập nhật thời gian cập nhật
                item.UpdatedAt = DateTime.Now;

                if (file != null)
                {
                    item.ImagePath = FileUpload.SaveImages("itemMstImage", file);
                }

                //xử lý nếu không có hình ảnh mới
                if (file == null || itemMst.ImagePath == null)
                {
                    item.ImagePath = item.ImagePath;
                }

                ////xử lý trùng hình ảnh
                //var checkImage = await db.ItemMsts.SingleOrDefaultAsync(i => i.ImagePath == item.ImagePath);
                //if (checkImage != null)
                //{
                //    FileUpload.DeleteImage(item.ImagePath);
                //    return new CustomResult(409, "Image already exists", null);
                //}

                // Kiểm tra sự tồn tại
                var brand = await db.BrandMsts.SingleOrDefaultAsync(b => b.Brand_ID == item.Brand_ID);
                var category = await db.CatMsts.SingleOrDefaultAsync(c => c.Cat_ID == item.Cat_ID);
                var certify = await db.CertifyMsts.SingleOrDefaultAsync(c => c.Certify_ID == item.Certify_ID);
                var product = await db.ProdMsts.SingleOrDefaultAsync(p => p.Prod_ID == item.Prod_ID);
                var goldType = await db.GoldKrtMsts.SingleOrDefaultAsync(g => g.GoldType_ID == item.GoldType_ID);
                var jewellery = await db.JewelTypeMsts.SingleOrDefaultAsync(j => j.Jewellery_ID == item.Jewellery_ID);

                //cập nhật thông tin
                //item.Style_Code = itemMst.Style_Code;
                item.Product_Name = itemMst.Product_Name;
                item.Prod_Quality = itemMst.Prod_Quality;
                item.Pairs = itemMst.Pairs;
                item.Brand_ID = itemMst.Brand_ID;
                item.Cat_ID = itemMst.Cat_ID;
                item.Certify_ID = itemMst.Certify_ID;
                item.Prod_ID = itemMst.Prod_ID;
                item.GoldType_ID = itemMst.GoldType_ID;
                item.Jewellery_ID = itemMst.Jewellery_ID;
                item.Quantity = itemMst.Quantity;
                item.Gold_Wt = itemMst.Gold_Wt;
                item.Stone_Wt = itemMst.Stone_Wt;
                item.Wstg = itemMst.Wstg;
                item.Visible = false;

                //gán
                item.BrandMst = brand;
                item.CatMst = category;
                item.CertifyMst = certify;
                item.ProdMst = product;
                item.GoldKrtMst = goldType;
                item.JewelTypeMst = jewellery;

                // Tính toán
                item.Gold_Rate = itemMst.Gold_Rate / 100;
                item.Net_Gold = item.Gold_Wt * item.Gold_Rate;
                item.Wstg_Per = item.Wstg * item.Gold_Rate;
                //total gross weight
                item.Tot_Gross_Wt = item.Gold_Wt + item.Wstg_Per + item.Wstg;
                //amount of gold in item
                item.Gold_Amt = item.Tot_Gross_Wt * item.Gold_Rate;
                //gold making charges
                item.Gold_Making = itemMst.Gold_Making;
                //stone making charges
                item.Stone_Making = itemMst.Stone_Making;
                //other making charges
                item.Other_Making = itemMst.Other_Making;
                //total making charges
                item.Tot_Making = item.Gold_Making + item.Stone_Making + item.Other_Making;
                //mrp of item (including stone making, gold making and other making)
                item.MRP = item.Gold_Wt + item.Wstg_Per + item.Wstg + item.Tot_Gross_Wt + item.Gold_Rate + item.Gold_Amt + item.Gold_Making + item.Stone_Making + item.Other_Making + item.Tot_Making;

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
                        if (item.Quantity <= 10)
                        {
                            item.Visible = false;
                        }
                        else
                        {
                            item.Visible = !item.Visible;
                        }

                        //item.Visible = !item.Visible;

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

        public async Task<List<ItemMst>> GetAllItemExcelReport()
        {
            var itemList = await db.ItemMsts.ToListAsync();
            return itemList;
        }

        public async Task<CustomResult> CheckQuantity()
        {
            try
            {
                var itemList = await db.ItemMsts.ToListAsync();
                var count = 0;
                foreach (var item in itemList)
                {
                    await UpdateVisibilityBelow10(item.Style_Code);
                    count++;
                }

                if (count == 0)
                {
                    return new CustomResult(204, "No item has quantity <= 10", null);
                }
                return new CustomResult(200, "Check Success", null);
            }
            catch (Exception e)
            {
                return new CustomResult(402, e.Message, null);
            }
        }

        private async Task<CustomResult> UpdateVisibilityBelow10(string id)
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
                        if (item.Quantity <= 10)
                        {
                            item.Visible = false;
                        }
                        else if (item.Quantity > 10)
                        {
                            item.Visible = true;
                        }

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
