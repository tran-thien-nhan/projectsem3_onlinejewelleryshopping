using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class GoldKrtMstRepo : IGoldKrtMstRepo
    {
        private readonly DatabaseContext db;
        public GoldKrtMstRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<CustomResult> CreateGoldKrtMst(GoldKrtMst newGoldKrtMst)
        {
            try
            {
                newGoldKrtMst.GoldType_ID = Guid.NewGuid().ToString();
                // Thiết lập thời gian tạo và cập nhật
                newGoldKrtMst.CreatedAt = DateTime.Now;
                newGoldKrtMst.UpdatedAt = DateTime.Now;


                await db.GoldKrtMsts.AddAsync(newGoldKrtMst);
                var result = await db.SaveChangesAsync();
                if (result == 1)
                {
                    return new CustomResult(200, "Create New Gold Success", newGoldKrtMst);
                }
                else
                {
                    return new CustomResult(201, "Create New Gold Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> DeleteGoldKrtMst(string id)
        {
            try
            {
                var gold = await db.GoldKrtMsts.SingleOrDefaultAsync(i => i.GoldType_ID == id);
                if (gold == null)
                {
                    return new CustomResult(201, "Not Found Gold", null);
                }
                else
                {
                    db.GoldKrtMsts.Remove(gold);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Delete Gold Success", gold);
                    }
                    return new CustomResult(201, "Delete Gold Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(402, ex.Message, null);
            }
        }

        public async Task<CustomResult> GetAllGoldKrtMst()
        {
            try
            {
                var result = await db.GoldKrtMsts.ToListAsync();
                if (result == null)
                {
                    return new CustomResult(401, "Gold List Something wrong", null);
                }
                else if (result.Count == 0) // Sửa lại điều kiện kiểm tra độ dài của danh sách
                {
                    return new CustomResult(204, "List gold is empty", result); // Thay đổi mã trạng thái 201 thành 204 nếu danh sách trống rỗng
                }
                else
                {
                    return new CustomResult(200, "Get list gold success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetGoldKrtMstById(string id)
        {
            try
            {
                var result = await db.GoldKrtMsts.SingleOrDefaultAsync(i => i.GoldType_ID == id);
                if (result == null)
                {
                    return new CustomResult(401, "not found gold_type", null);
                }
                else
                {
                    return new CustomResult(200, "Get gold success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateGoldKrtMst(GoldKrtMst goldKrtMst)
        {
            try
            {
                var gold = await db.GoldKrtMsts.SingleOrDefaultAsync(i => i.GoldType_ID == goldKrtMst.GoldType_ID);
                if (gold == null)
                {
                    return new CustomResult(201, "Not Found Gold For Update", null);
                }

                //cập nhật thông tin
                gold.GoldType_ID = goldKrtMst.GoldType_ID;
                gold.Gold_Crt = goldKrtMst.Gold_Crt;
                gold.Gold_Year = goldKrtMst.Gold_Year;
                gold.Visible = goldKrtMst.Visible;


                //cập nhật thời gian cập nhật
                gold.UpdatedAt = DateTime.Now;


                //cập nhật item
                db.GoldKrtMsts.Update(gold);
                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "Update Gold Success", gold);
                }
                else
                {
                    return new CustomResult(201, "No changes of gold were made in the database", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> UpdateGoldKrtVisibility(string id)
        {
            try
            {
                var gold = await db.GoldKrtMsts.SingleOrDefaultAsync(i => i.GoldType_ID == id);
                if (gold == null)
                {
                    return new CustomResult(201, "Not Found Gold", null);
                }
                else
                {
                    try
                    {
                        gold.Visible = !gold.Visible;

                        db.GoldKrtMsts.Update(gold);

                        var result = await db.SaveChangesAsync();
                        if (result == 1)
                        {
                            return new CustomResult(200, "Update gold Visibility Success", gold);
                        }
                        return new CustomResult(201, "No changes were made in the database", null);
                    }
                    catch (Exception ex)
                    {
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
