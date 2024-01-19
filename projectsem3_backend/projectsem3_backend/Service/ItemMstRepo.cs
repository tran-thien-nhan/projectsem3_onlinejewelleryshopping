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

        public async Task<CustomResult> CreateItemMst(ItemMst itemMst, IFormFile file)
        {
            using (var transaction = await db.Database.BeginTransactionAsync())
            {
                try
                {
                    itemMst.Style_Code = default;

                    if (itemMst == null || file == null)
                    {
                        return new CustomResult(400, "Invalid input. Product or Image is null.", null);
                    }

                    itemMst.ImagePath = FileUpload.SaveImages("productImage", file);

                    await db.ItemMsts.AddAsync(itemMst);
                    var result = await db.SaveChangesAsync();

                    if (result > 0)
                    {
                        await transaction.CommitAsync();
                        return new CustomResult(200, "Created Success", itemMst);
                    }
                    else
                    {
                        FileUpload.DeleteImage(itemMst.ImagePath);
                        await transaction.RollbackAsync();
                        return new CustomResult(201, "No changes were made in the database", null);
                    }
                }
                catch (DbUpdateException ex)
                {
                    if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                    {
                        FileUpload.DeleteImage(itemMst.ImagePath);
                        await transaction.RollbackAsync();
                        return new CustomResult(409, "Duplicate entry. Product with the same key already exists.", null);
                    }

                    FileUpload.DeleteImage(itemMst.ImagePath);
                    await transaction.RollbackAsync();
                    return new CustomResult(500, ex.Message, null);
                }
                catch (Exception ex)
                {
                    FileUpload.DeleteImage(itemMst.ImagePath);
                    await transaction.RollbackAsync();
                    return new CustomResult(500, ex.Message, null);
                }
            }
        }

        public async Task<CustomResult> UpdateItemMst(ItemMst itemMst, IFormFile file)
        {
            using (var transaction = await db.Database.BeginTransactionAsync())
            {
                try
                {
                    var oldItem = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == itemMst.Style_Code);
                    if (oldItem == null)
                    {
                        return new CustomResult(404, "not found", null);
                    }
                    else
                    {
                        try
                        {
                            oldItem.Style_Code = itemMst.Style_Code;
                            oldItem.Product_Name = itemMst.Product_Name;
                            oldItem.Pairs = itemMst.Pairs;
                            oldItem.Brand_ID = itemMst.Brand_ID;
                            oldItem.Quantity = itemMst.Quantity;
                            oldItem.Cat_ID = itemMst.Cat_ID;
                            oldItem.Prod_Quality = itemMst.Prod_Quality;
                            oldItem.Certify_ID = itemMst.Certify_ID;
                            oldItem.Prod_ID = itemMst.Prod_ID;
                            oldItem.GoldType_ID = itemMst.GoldType_ID;
                            oldItem.Jewellery_ID = itemMst.Jewellery_ID;
                            oldItem.Gold_Wt = itemMst.Gold_Wt;
                            oldItem.Stone_Wt = itemMst.Stone_Wt;
                            oldItem.Net_Gold = itemMst.Net_Gold;
                            oldItem.Wstg_Per = itemMst.Wstg_Per;
                            oldItem.Wstg = itemMst.Wstg;
                            oldItem.Tot_Gross_Wt = itemMst.Tot_Gross_Wt;
                            oldItem.Gold_Rate = itemMst.Gold_Rate;
                            oldItem.Gold_Amt = itemMst.Gold_Amt;
                            oldItem.Gold_Making = itemMst.Gold_Making;
                            oldItem.Stone_Making = itemMst.Stone_Making;
                            oldItem.Other_Making = itemMst.Other_Making;
                            oldItem.Tot_Making = itemMst.Tot_Making;
                            oldItem.MRP = itemMst.MRP;

                            if (file != null)
                            {
                                FileUpload.DeleteImage(oldItem.ImagePath);
                                string imageUrl = FileUpload.SaveImages("itemMstImage", file);
                                oldItem.ImagePath = imageUrl;
                            }

                            db.ItemMsts.Update(oldItem);
                            var result = await db.SaveChangesAsync();


                            if (result > 0)
                            {
                                await transaction.CommitAsync();
                                return new CustomResult(200, "Update Success", oldItem);
                            }
                            else
                            {
                                FileUpload.DeleteImage(itemMst.ImagePath);
                                await transaction.RollbackAsync();
                                return new CustomResult(201, "No changes were made in the database", null);
                            }
                        }
                        catch (Exception ex)
                        {
                            // Check for specific DbUpdateException for unique constraint violation (e.g., duplicate key)
                            if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                            {
                                FileUpload.DeleteImage(itemMst.ImagePath);
                                await transaction.RollbackAsync();
                                return new CustomResult(409, "Duplicate entry. Another product with the same key already exists.", null);
                            }

                            FileUpload.DeleteImage(itemMst.ImagePath);
                            await transaction.RollbackAsync();
                            return new CustomResult(500, ex.Message, null);
                        }
                    }
                }
                catch (Exception e)
                {
                    FileUpload.DeleteImage(itemMst.ImagePath);
                    await transaction.RollbackAsync();
                    return new CustomResult(500, e.Message, null);
                }
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
