using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class BrandMstRepo : IBrandMstRepo
    {
        private readonly DatabaseContext db;

        public BrandMstRepo(DatabaseContext db)
        {
            this.db = db;
        }
        public async Task<CustomResult> CreateBrandMst(BrandMst brandMst)
        {
            try
            {
                brandMst.Brand_ID = Guid.NewGuid().ToString();
                // Thiết lập thời gian tạo và cập nhật
                brandMst.CreatedAt = DateTime.Now;
                brandMst.UpdatedAt = DateTime.Now;


                await db.BrandMsts.AddAsync(brandMst);
                var result = await db.SaveChangesAsync();
                if (result == 1)
                {
                    return new CustomResult(200, "Create New Brand Success", brandMst);
                }
                else
                {
                    return new CustomResult(201, "Create New Brand Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }
        public async Task<CustomResult> DeleteBrandMst(string id)
        {
            try
            {
                var brandMst = await db.BrandMsts.SingleOrDefaultAsync(i => i.Brand_ID == id);
                if (brandMst == null)
                {
                    return new CustomResult(404, "Brand Not Found", null);
                }
                db.BrandMsts.Remove(brandMst);
                var result = await db.SaveChangesAsync();
                if (result == 1)
                {
                    return new CustomResult(200, "Delete Brand Success", brandMst);
                }
                else
                {
                    return new CustomResult(201, "Delete Brand Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }
        public async Task<CustomResult> GetAllBrandMst()
        {
            try
            {
                var result = await db.BrandMsts.ToListAsync();
                if (result == null)
                {
                    return new CustomResult(401, "Brand Create Something wrong", null);
                }
                else if (result.Count == 0) // Sửa lại điều kiện kiểm tra độ dài của danh sách
                {
                    return new CustomResult(204, "List brand is empty", result); // Thay đổi mã trạng thái 201 thành 204 nếu danh sách trống rỗng
                }
                else
                {
                    return new CustomResult(200, "Get list Brand success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }
        public async Task<CustomResult> GetBrandMstById(string id)
        {
            try
            {
                var result = await db.BrandMsts.SingleOrDefaultAsync(i => i.Brand_ID == id);
                if (result == null)
                {
                    return new CustomResult(401, "Brand Create Something wrong", null);
                }
                else
                {
                    return new CustomResult(200, "Get Brand success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateBrandMst(BrandMst brandMst)
        {
            try
            {
                var brand = await db.BrandMsts.SingleOrDefaultAsync(i => i.Brand_ID == brandMst.Brand_ID);
                if (brand == null)
                {
                    return new CustomResult(201, "Not Found Brand For Update", null);
                }

                //cập nhật thông tin
                brand.Brand_ID = brandMst.Brand_ID;
                brand.Brand_ID = brandMst.Brand_ID;

                //cập nhật thời gian cập nhật
                brand.UpdatedAt = DateTime.Now;


                //cập nhật item
                db.BrandMsts.Update(brand);
                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "Update Brand Success", brand);
                }
                else
                {
                    return new CustomResult(201, "No changes of Brand were made in the database", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> UpdateBrandVisibility(string id)
        {
            try
            {
                var brand = await db.BrandMsts.SingleOrDefaultAsync(i => i.Brand_ID == id);
                if (brand == null)
                {
                    return new CustomResult(201, "Not Found brand", null);
                }
                else
                {
                    try
                    {
                        brand.Visible = !brand.Visible;

                        db.BrandMsts.Update(brand);

                        var result = await db.SaveChangesAsync();
                        if (result == 1)
                        {
                            return new CustomResult(200, "Update brand Success", brand);
                        }
                        return new CustomResult(201, "No changes brand were made in the database", null);
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