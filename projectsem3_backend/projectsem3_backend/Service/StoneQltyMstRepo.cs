using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class StoneQltyMstRepo : IStoneQltyMstRepo
    {
        private readonly DatabaseContext db;
        public StoneQltyMstRepo(DatabaseContext db)
        {
            this.db = db;
        }
        public async Task<CustomResult> CreateStoneQltyMst( StoneQltyMst stoneQltyMst )
            {
            try
                {
                if (stoneQltyMst == null)
                    {
                    return new CustomResult(400, "Invalid input. StoneQltyMst is null.", null);
                    }

                // Kiểm tra xem Stone Quality đã tồn tại trong cơ sở dữ liệu chưa
                var existingStoneQlty = await db.StoneQltyMsts.FirstOrDefaultAsync(s => s.StoneQlty == stoneQltyMst.StoneQlty);
                if (existingStoneQlty != null)
                    {
                    return new CustomResult(400, "Stone Quality already exists.", null);
                    }

                // Kiểm tra xem Stone Quality đã tồn tại trong cơ sở dữ liệu chưa
                var existingStoneQltyWithSameID = await db.StoneQltyMsts.FirstOrDefaultAsync(s => s.StoneQlty_ID == stoneQltyMst.StoneQlty_ID);
                if (existingStoneQltyWithSameID != null)
                    {
                    return new CustomResult(400, "Another Stone Quality with the same ID already exists.", null);
                    }

                // Tạo một StoneQlty_ID mới
                stoneQltyMst.StoneQlty_ID = Guid.NewGuid().ToString();

                db.StoneQltyMsts.Add(stoneQltyMst);
                var result = await db.SaveChangesAsync();

                return result > 0 ? new CustomResult(201, "Created Success", stoneQltyMst) : new CustomResult(204, "No changes were made in the database", null);
                }
            catch (Exception ex)
                {
                return new CustomResult(500, ex.Message, null);
                }
            }


        public async Task<CustomResult> DeleteStoneQltyMst(string id)
        {
            try
            {
                var stoneQlty = await db.StoneQltyMsts.SingleOrDefaultAsync(i => i.StoneQlty_ID == id);
                if (stoneQlty == null)
                {
                    return new CustomResult(201, "Not Found Quality Stone", null);
                }
                else
                {
                    db.StoneQltyMsts.Remove(stoneQlty);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Delete Stone Quality Success", stoneQlty);
                    }
                    return new CustomResult(201, "Delete Quality Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(402, ex.Message, null);
            }
        }

        public async Task<CustomResult> GetAllStoneQltyMst()
        {
            try
            {
                var result = await db.StoneQltyMsts.ToListAsync();
                if (result == null)
                {
                    return new CustomResult(401, "Stone Quantity Get List Something Wrong", null);
                }
                else if(result.Count == 0)
                {
                    return new CustomResult(204, "List Stone Quantity List", result);
                }
                else
                {
                    return new CustomResult(200, "Get Stone Quantity Success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetStoneQltyMst(string id)
        {
            try
            {
                var result = await db.StoneQltyMsts.SingleOrDefaultAsync(i => i.StoneQlty_ID == id);
                if (result == null)
                {
                    return new CustomResult(401, "not found stone quantity id", null);
                }
                else
                {
                    return new CustomResult(200, "Get stone quantity success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateStoneQltyMst(StoneQltyMst stoneQltyMst)
        {
            try
            {
                var stoneQlty = await db.StoneQltyMsts.SingleOrDefaultAsync(i => i.StoneQlty_ID == stoneQltyMst.StoneQlty_ID);
                if (stoneQlty == null)
                {
                    return new CustomResult(400, "Not Found", null);
                }

                //cập nhật thời gian cập nhật
                stoneQlty.UpdatedAt = DateTime.Now;

                //cập nhật thông tin
                stoneQlty.StoneQlty_ID = stoneQltyMst.StoneQlty_ID;
                stoneQlty.StoneQlty = stoneQltyMst.StoneQlty;
                stoneQlty.Stone_Year = stoneQltyMst.Stone_Year;
                stoneQlty.Visible = stoneQltyMst.Visible;

                //cập nhật item
                db.StoneQltyMsts.Update(stoneQlty);
                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "Update Stone Quantity Success", stoneQlty);
                }
                else
                {
                    return new CustomResult(201, "No changes were made in the database", null);
                }
            }
            catch (Exception ex)
            {
                /*
                // Check for specific DbUpdateException for unique constraint violation (e.g., duplicate key)
                if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                {
                    FileUpload.DeleteImage(itemMst.ImagePath);
                    return new CustomResult(409, "Duplicate entry. Another product with the same key already exists.", null);
                }

                FileUpload.DeleteImage(itemMst.ImagePath);
                */
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> UpdateStoneQltyVisibility(string id)
        {
            try
            {
                var stoneQlty = await db.StoneQltyMsts.SingleOrDefaultAsync(i => i.StoneQlty_ID == id);
                if (stoneQlty == null)
                {
                    return new CustomResult(201, "Not Found Stone Quality", null);
                }
                else
                {
                    try
                    {
                        stoneQlty.Visible = !stoneQlty.Visible;

                        db.StoneQltyMsts.Update(stoneQlty);

                        var result = await db.SaveChangesAsync();
                        if (result == 1)
                        {
                            return new CustomResult(200, "Update Stone Quality Success", stoneQlty);
                        }
                        return new CustomResult(201, "No changes were made in the database", null);
                    }
                    catch (Exception ex)
                    {
                        // Check for specific DbUpdateException for unique constraint violation (e.g., duplicate key)
                        if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                        {
                            return new CustomResult(409, "Duplicate entry. Another stone quality with the same key already exists.", null);
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
