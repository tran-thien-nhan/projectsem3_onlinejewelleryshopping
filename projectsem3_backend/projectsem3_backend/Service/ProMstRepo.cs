using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
    {
    public class ProMstRepo : IProdMstRepo
        {
        private readonly DatabaseContext _db;

        public ProMstRepo( DatabaseContext db )
            {
            _db = db;
            }

        public async Task<CustomResult> GetAllProdMsts()
            {
            try
                {
                var prodMsts = await _db.ProdMsts.ToListAsync();
                return new CustomResult(200, "Success", prodMsts);
                }
            catch (Exception ex)
                {
                return new CustomResult(500, $"Internal Server Error: {ex.Message}", null);
                }
            }

        public async Task<CustomResult> GetProdMstById( string id )
            {
            try
                {
                var prodMst = await _db.ProdMsts.SingleOrDefaultAsync(p => p.Prod_ID == id);
                if (prodMst != null)
                    {
                    return new CustomResult(200, "Success", prodMst);
                    }
                else
                    {
                    return new CustomResult(404, "Not Found", null);
                    }
                }
            catch (Exception ex)
                {
                return new CustomResult(500, $"Internal Server Error: {ex.Message}", null);
                }
            }

        public async Task<CustomResult> CreateProdMst( ProdMst prodMst )
            {
            try
                {
                if (prodMst == null)
                    {
                    return new CustomResult(400, "Invalid input. ProdMst is null.", null);
                    }

                // Kiểm tra xem tên sản phẩm đã tồn tại trong cơ sở dữ liệu chưa
                var existingProd = await _db.ProdMsts.FirstOrDefaultAsync(p => p.Prod_Type == prodMst.Prod_Type);
                if (existingProd != null)
                    {
                    return new CustomResult(400, "Product with the same name already exists.", null);
                    }

                // Kiểm tra xem sản phẩm đã tồn tại trong cơ sở dữ liệu chưa
                var existingProdWithSameID = await _db.ProdMsts.FirstOrDefaultAsync(p => p.Prod_ID == prodMst.Prod_ID);
                if (existingProdWithSameID != null)
                    {
                    return new CustomResult(400, "Another product with the same ID already exists.", null);
                    }

                // Tạo một Prod_ID mới
                prodMst.Prod_ID = Guid.NewGuid().ToString();

                _db.ProdMsts.Add(prodMst);
                var result = await _db.SaveChangesAsync();

                return result > 0 ? new CustomResult(201, "Created Success", prodMst) : new CustomResult(204, "No changes were made in the database", null);
                }
            catch (Exception ex)
                {
                return new CustomResult(500, ex.Message, null);
                }
            }



        private int GenerateUniqueNumericId()
            {
            // Sử dụng một số nguyên ngẫu nhiên có một chữ số
            Random random = new Random();
            return random.Next(0, 9);
            }


        public async Task<CustomResult> UpdateProdMst( ProdMst prodMst )
            {
            try
                {
                if (prodMst == null)
                    {
                    return new CustomResult(400, "Invalid input. ProdMst is null.", null);
                    }

                var existingProd = await _db.ProdMsts.SingleOrDefaultAsync(p => p.Prod_ID == prodMst.Prod_ID);

                if (existingProd != null)
                    {
                    // Cập nhật thông tin
                    existingProd.Prod_Type = prodMst.Prod_Type;

                    // Cập nhật thời gian cập nhật
                    existingProd.UpdatedAt = DateTime.Now;

                    // Cập nhật ProdMst
                    _db.ProdMsts.Update(existingProd);
                    var result = await _db.SaveChangesAsync();

                    if (result == 1)
                        {
                        return new CustomResult(200, "Update Success", existingProd);
                        }
                    else
                        {
                        return new CustomResult(201, "No changes were made in the database", null);
                        }
                    }

                return new CustomResult(404, "Not Found", null);
                }
            catch (Exception ex)
                {
                return HandleDbException(ex, prodMst);
                }
            }

        public async Task<CustomResult> DeleteProdMst( string id )
            {
            try
                {
                var prodMst = await _db.ProdMsts.SingleOrDefaultAsync(p => p.Prod_ID == id);

                if (prodMst == null)
                    {
                    return new CustomResult(404, "Item not found", null);
                    }
                else
                    {
                    _db.ProdMsts.Remove(prodMst);
                    var result = await _db.SaveChangesAsync();
                    return result == 1 ? new CustomResult(200, "Delete Success", prodMst) : new CustomResult(201, "Delete Error", null);
                    }
                }
            catch (Exception ex)
                {
                return new CustomResult(402, ex.Message, null);
                }
            }

        public async Task<CustomResult> UpdateVisibility( string id )
            {
            try
                {
                var prodMst = await _db.ProdMsts.SingleOrDefaultAsync(p => p.Prod_ID == id);

                if (prodMst != null)
                    {
                    prodMst.Visible = !prodMst.Visible;
                    await _db.SaveChangesAsync();
                    return new CustomResult(200, "Update Success", prodMst);
                    }

                return new CustomResult(404, "Not Found", null);
                }
            catch (Exception ex)
                {
                return HandleDbException(ex, null);
                }
            }

        private CustomResult HandleDbException( Exception ex, ProdMst prodMst )
            {
            if (ex is DbUpdateException dbUpdateException && ex.InnerException is SqlException sqlException)
                {
                if (sqlException.Number == 2627)
                    {
                    return new CustomResult(409, "Duplicate entry. Another ProdMst with the same key already exists.", null);
                    }
                }

            return new CustomResult(500, ex.Message, null);
            }
        }
    }
