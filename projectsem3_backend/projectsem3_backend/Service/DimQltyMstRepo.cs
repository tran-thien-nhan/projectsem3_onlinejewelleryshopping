using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
    {
    public class DimQltyMstRepo : IDimQltyMstRepo
        {
        private readonly DatabaseContext _db;

        public DimQltyMstRepo( DatabaseContext db )
            {
            _db = db;
            }

        public async Task<CustomResult> GetAllDimQltyMst()
            {
            try
                {
                var result = await _db.DimQltyMsts.ToListAsync();
                if (result == null)
                    {
                    return new CustomResult(401, "Something went wrong", null);
                    }
                else if (result.Count == 0)
                    {
                    return new CustomResult(204, "List is empty", result);
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

        public async Task<CustomResult> GetDimQltyMstById( string id )
            {
            try
                {
                var result = await _db.DimQltyMsts.SingleOrDefaultAsync(d => d.DimQlty_ID == id);
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

        public async Task<CustomResult> CreateDimQltyMst( DimQltyMst dimQltyMst )
            {
            try
                {
                try
                    {
                    // Tạo một Style_Code mới
                    dimQltyMst.DimQlty_ID = Guid.NewGuid().ToString();

                    // Thiết lập thời gian tạo và cập nhật
                    dimQltyMst.CreatedAt = DateTime.Now;
                    dimQltyMst.UpdatedAt = DateTime.Now;

                    await _db.DimQltyMsts.AddAsync(dimQltyMst);
                    var result = await _db.SaveChangesAsync();
                    if (result == 1)
                        {
                        return new CustomResult(200, "Create Success", dimQltyMst);
                        }
                    else
                        {
                        return new CustomResult(201, "Create Error", null);
                        }
                    }
                catch (Exception ex)
                    {
                    return HandleDbUpdateException(ex, dimQltyMst);
                    }
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }


        public async Task<CustomResult> UpdateDimQltyMst( DimQltyMst dimQltyMst )
            {
            try
                {
                var dimQlty = await _db.DimQltyMsts.SingleOrDefaultAsync(d => d.DimQlty_ID == dimQltyMst.DimQlty_ID);
                if (dimQlty == null)
                    {
                    return new CustomResult(201, "Not Found", null);
                    }

                // Cập nhật thông tin
                dimQlty.DimQlty = dimQltyMst.DimQlty;

                // Cập nhật thời gian cập nhật
                dimQlty.UpdatedAt = DateTime.Now;

                // Cập nhật dimQlty
                _db.DimQltyMsts.Update(dimQlty);
                var result = await _db.SaveChangesAsync();

                if (result == 1)
                    {
                    return new CustomResult(200, "Update Success", dimQlty);
                    }
                else
                    {
                    return new CustomResult(201, "No changes were made in the database", null);
                    }
                }
            catch (Exception ex)
                {
                return HandleDbUpdateException(ex, dimQltyMst);
                }
            }

        public async Task<CustomResult> DeleteDimQltyMst( string id )
            {
            try
                {
                var dimQlty = await _db.DimQltyMsts.SingleOrDefaultAsync(d => d.DimQlty_ID == id);
                if (dimQlty == null)
                    {
                    return new CustomResult(201, "Not Found", null);
                    }
                else
                    {
                    _db.DimQltyMsts.Remove(dimQlty);
                    var result = await _db.SaveChangesAsync();
                    if (result == 1)
                        {
                        return new CustomResult(200, "Delete Success", dimQlty);
                        }
                    return new CustomResult(201, "Delete Error", null);
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
                var dimQlty = await _db.DimQltyMsts.SingleOrDefaultAsync(d => d.DimQlty_ID == id);
                if (dimQlty == null)
                    {
                    return new CustomResult(201, "Not Found", null);
                    }
                else
                    {
                    try
                        {
                        dimQlty.Visible = !dimQlty.Visible;

                        _db.DimQltyMsts.Update(dimQlty);

                        var result = await _db.SaveChangesAsync();
                        if (result == 1)
                            {
                            return new CustomResult(200, "Update Success", dimQlty);
                            }
                        return new CustomResult(201, "No changes were made in the database", null);
                        }
                    catch (Exception ex)
                        {
                        return HandleDbUpdateException(ex, dimQlty);
                        }
                    }
                }
            catch (Exception e)
                {
                return new CustomResult(402, e.Message, null);
                }
            }

        private CustomResult HandleDbUpdateException( Exception ex, DimQltyMst dimQltyMst )
            {
            // Check for specific DbUpdateException for unique constraint violation (e.g., duplicate key)
            if (ex.InnerException is SqlException sqlException && sqlException.Number == 2627)
                {
                return new CustomResult(409, "Duplicate entry. Another dimQlty with the same key already exists.", null);
                }

            return new CustomResult(500, ex.Message, null);
            }
        }
    }
