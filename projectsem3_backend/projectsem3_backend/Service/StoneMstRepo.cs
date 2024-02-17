using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Helper;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class StoneMstRepo : IStoneMstRepo
    {
        private readonly DatabaseContext db;

        public StoneMstRepo(DatabaseContext db)
        {
            this.db = db;
        }
        public async Task<CustomResult> CreateStoneMst(StoneMst stoneMst)
        {
            try
            {
                stoneMst.Style_Code = Guid.NewGuid().ToString();
                // Thiết lập thời gian tạo và cập nhật
                stoneMst.CreatedAt = DateTime.Now;
                stoneMst.UpdatedAt = DateTime.Now;

                // Kiểm tra sự tồn tại
                var stoneQlty = await db.StoneQltyMsts.SingleOrDefaultAsync(s => s.StoneQlty_ID == stoneMst.StoneQlty_ID);
                var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == stoneMst.Style_Code);
                //gán
                stoneMst.StoneQltyMst = stoneQlty;
                stoneMst.ItemMst = item;
                stoneMst.Visible = false;

                //Tính toán
                stoneMst.Stone_Rate = stoneMst.Stone_Rate / 100;
                stoneMst.Stone_Gm = stoneMst.Stone_Gm * stoneMst.Stone_Pcs * stoneMst.Stone_Rate; 

                await db.StoneMsts.AddAsync(stoneMst);
                var result = await db.SaveChangesAsync();
                if (result == 1)
                {
                    return new CustomResult(200, "Create New Stone Success", stoneMst);
                }
                else
                {
                    return new CustomResult(201, "Create New Stone Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> DeleteStoneMst(string id)
        {
            try
            {
                var stone = await db.StoneMsts.SingleOrDefaultAsync(i => i.Style_Code == id);
                if (stone == null)
                {
                    return new CustomResult(201, "Not Found Stone", null);
                }
                else
                {
                    db.StoneMsts.Remove(stone);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Delete Success Stone", stone);
                    }
                    return new CustomResult(201, "Delete Stone Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(402, ex.Message, null);
            }
        }

        public async Task<CustomResult> GetAllStoneMst()
        {
            try
            {
                var result = await db.StoneMsts.ToListAsync();
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
                    return new CustomResult(200, "Get list stone success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetStoneMstById(string id)
        {
            try
            {
                var result = await db.StoneMsts.SingleOrDefaultAsync(i => i.Style_Code == id);
                if (result == null)
                {
                    return new CustomResult(401, "not found stone", null);
                }
                else
                {
                    return new CustomResult(200, "Get stone success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateStoneMst(StoneMst stoneMst)
        {
            try
            {
                var stone = await db.StoneMsts.SingleOrDefaultAsync(i => i.Style_Code == stoneMst.Style_Code);
                if (stone == null)
                {
                    return new CustomResult(201, "Not Found", null);
                }

                //cập nhật thông tin


                //cập nhật thời gian cập nhật
                stone.UpdatedAt = DateTime.Now;

                /* 
                if (file != null)
                {
                    item.ImagePath = FileUpload.SaveImages("itemMstImage", file);
                }
                */

                // Kiểm tra sự tồn tại
                var stoneQlty = await db.StoneQltyMsts.SingleOrDefaultAsync(s => s.StoneQlty_ID == stoneMst.StoneQlty_ID);
                var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == stoneMst.Style_Code);

                //gán
                stone.StoneQltyMst = stoneQlty;
                stone.ItemMst = item;

                //cap nhat thong tin
                //stone.Style_Code = stoneMst.Style_Code;
                stone.Stone_Crt = stoneMst.Stone_Crt;
                stone.Stone_Gm = stoneMst.Stone_Gm;
                stone.Stone_Pcs = stoneMst.Stone_Pcs;
                stone.Stone_Rate = stoneMst.Stone_Rate / 100;
                stone.Stone_Amt = stone.Stone_Gm * stone.Stone_Pcs * stone.Stone_Rate;
                stone.Visible = stoneMst.Visible;

                //cập nhật item
                db.StoneMsts.Update(stone);
                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "Update Stone Success", stone);
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
                    return new CustomResult(409, "Duplicate entry. Another stone with the same key already exists.", null);
                }
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> UpdateStoneVisibility(string id)
        {
            try
            {
                var stone = await db.StoneMsts.SingleOrDefaultAsync(i => i.Style_Code == id);
                if (stone == null)
                {
                    return new CustomResult(201, "Not Found Stone", null);
                }
                else
                {
                    try
                    {
                        stone.Visible = !stone.Visible;

                        db.StoneMsts.Update(stone);

                        var result = await db.SaveChangesAsync();
                        if (result == 1)
                        {
                            return new CustomResult(200, "Update Stone Success", stone);
                        }
                        return new CustomResult(201, "No changes stone were made in the database", null);
                    }
                    catch (Exception ex)
                    {
                        /*
                        // Check for specific DbUpdateException for unique constraint violation (e.g., duplicate key)
                        if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                        {
                            return new CustomResult(409, "Duplicate entry. Another product with the same key already exists.", null);
                        }
                        */

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
