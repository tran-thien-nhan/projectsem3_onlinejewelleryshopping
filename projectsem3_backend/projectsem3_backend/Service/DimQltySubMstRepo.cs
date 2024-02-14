using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
    {
    public class DimQltySubMstRepo : IDimQltySubMstRepo
        {
        private readonly DatabaseContext _db;

        public DimQltySubMstRepo( DatabaseContext db )
            {
            _db = db;
            }

        public async Task<CustomResult> GetAllDimQltySubMst()
            {
            try
                {
                var result = await _db.DimQltySubMsts.ToListAsync();
                return new CustomResult(200, "Get all items success", result);
                }
            catch (Exception ex)
                {
                // Log the exception
                return new CustomResult(500, ex.Message, null);
                }
            }

        public async Task<CustomResult> GetDimQltySubMstById( string id )
            {
            try
                {
                var result = await _db.DimQltySubMsts.SingleOrDefaultAsync(i => i.DimSubType_ID == id);
                if (result == null)
                    {
                    return new CustomResult(404, "Item not found", null);
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

        public async Task<CustomResult> CreateDimQltySubMst( DimQltySubMst dimQltySubMst )
            {
            try
                {
                if (dimQltySubMst == null)
                    {
                    return new CustomResult(400, "Invalid input. DimQltySubMst is null.", null);
                    }

                // Tạo một DimSubType_ID mới
                dimQltySubMst.DimSubType_ID = Guid.NewGuid().ToString();

                _db.DimQltySubMsts.Add(dimQltySubMst);
                var result = await _db.SaveChangesAsync();

                return result > 0 ? new CustomResult(201, "Created Success", dimQltySubMst) : new CustomResult(204, "No changes were made in the database", null);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> UpdateDimQltySubMst( DimQltySubMst dimQltySubMst )
            {
            try
                {
                if (dimQltySubMst == null)
                    {
                    return new CustomResult(400, "Invalid input. DimQltySubMst is null.", null);
                    }

                _db.DimQltySubMsts.Update(dimQltySubMst);
                var result = await _db.SaveChangesAsync();

                return result > 0 ? new CustomResult(200, "Update Success", dimQltySubMst) : new CustomResult(204, "No changes were made in the database", null);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> DeleteDimQltySubMst( string id )
            {
            try
                {
                var dimQltySubMst = await _db.DimQltySubMsts.SingleOrDefaultAsync(i => i.DimSubType_ID == id);
                if (dimQltySubMst == null)
                    {
                    return new CustomResult(404, "Item not found", null);
                    }
                else
                    {
                    _db.DimQltySubMsts.Remove(dimQltySubMst);
                    var result = await _db.SaveChangesAsync();
                    return result == 1 ? new CustomResult(200, "Delete Success", dimQltySubMst) : new CustomResult(204, "No changes were made in the database", null);
                    }
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> UpdateVisibility( string id )
            {
            try
                {
                var dimQltySubMst = await _db.DimQltySubMsts.SingleOrDefaultAsync(i => i.DimSubType_ID == id);
                if (dimQltySubMst == null)
                    {
                    return new CustomResult(404, "Item not found", null);
                    }
                else
                    {
                    dimQltySubMst.Visible = !dimQltySubMst.Visible;
                    _db.DimQltySubMsts.Update(dimQltySubMst);
                    var result = await _db.SaveChangesAsync();
                    return result == 1 ? new CustomResult(200, "Update Success", dimQltySubMst) : new CustomResult(204, "No changes were made in the database", null);
                    }
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }
        }
    }
