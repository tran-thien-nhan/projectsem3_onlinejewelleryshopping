using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Helper;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class CatMstRepo : ICatMstRepo
    {
        private readonly DatabaseContext db;

        public CatMstRepo(DatabaseContext db)
        {
            this.db = db;
        }
        public async Task<CustomResult> CreateCatMst(CatMst newCatMst)
        {
            try
            {
                newCatMst.Cat_ID = Guid.NewGuid().ToString();
                // Thiết lập thời gian tạo và cập nhật
                newCatMst.CreatedAt = DateTime.Now;
                newCatMst.UpdatedAt = DateTime.Now;


                await db.CatMsts.AddAsync(newCatMst);
                var result = await db.SaveChangesAsync();
                if (result == 1)
                {
                    return new CustomResult(200, "Create New Category Success", newCatMst);
                }
                else
                {
                    return new CustomResult(201, "Create New Category Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> DeleteCatMst(string id)
        {
            try
            {
                var category = await db.CatMsts.SingleOrDefaultAsync(i => i.Cat_ID == id);
                if (category == null)
                {
                    return new CustomResult(201, "Not Found Category", null);
                }
                else
                {
                    db.CatMsts.Remove(category);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Delete Category Success", category);
                    }
                    return new CustomResult(201, "Delete Category Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(402, ex.Message, null);
            }
        }

        public async Task<CustomResult> GetAllCatMst()
        {
            try
            {
                var result = await db.CatMsts.ToListAsync();
                if (result == null)
                {
                    return new CustomResult(401, "Category Create Something wrong", null);
                }
                else if (result.Count == 0) // Sửa lại điều kiện kiểm tra độ dài của danh sách
                {
                    return new CustomResult(204, "List category is empty", result); // Thay đổi mã trạng thái 201 thành 204 nếu danh sách trống rỗng
                }
                else
                {
                    return new CustomResult(200, "Get list category success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetCatMstById(string id)
        {
            try
            {
                var result = await db.CatMsts.SingleOrDefaultAsync(i => i.Cat_ID == id);
                if (result == null)
                {
                    return new CustomResult(401, "not found cat_id", null);
                }
                else
                {
                    return new CustomResult(200, "Get category success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateCatMst(CatMst catMst)
        {
            try
            {
                var category = await db.CatMsts.SingleOrDefaultAsync(i => i.Cat_ID == catMst.Cat_ID);
                if (category == null)
                {
                    return new CustomResult(201, "Not Found Category For Update", null);
                }

                //cập nhật thông tin
                category.Cat_ID = catMst.Cat_ID;
                category.Cat_Name = catMst.Cat_Name;
                category.Visible = catMst.Visible;
                
                //cập nhật thời gian cập nhật
                category.UpdatedAt = DateTime.Now;


                //cập nhật item
                db.CatMsts.Update(category);
                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "Update Category Success", category);
                }
                else
                {
                    return new CustomResult(201, "No changes of category were made in the database", null);
                }
            }
            catch (Exception ex)
            {
                if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                {
                    return new CustomResult(409, "Duplicate entry. Another categories with the same key already exists.", null);
                }
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> UpdateCatVisibility(string id)
        {
            try
            {
                var category = await db.CatMsts.SingleOrDefaultAsync(i => i.Cat_ID == id);
                if (category == null)
                {
                    return new CustomResult(201, "Not Found Category", null);
                }
                else
                {
                    try
                    {
                        category.Visible = !category.Visible;

                        db.CatMsts.Update(category);

                        var result = await db.SaveChangesAsync();
                        if (result == 1)
                        {
                            return new CustomResult(200, "Update Category Success", category);
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
