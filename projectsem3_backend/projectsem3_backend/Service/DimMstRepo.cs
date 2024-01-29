using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
    {
    public class DimMstRepo : IDimMstRepo
        {
        private readonly DatabaseContext _db;

        public DimMstRepo( DatabaseContext db )
            {
            _db = db;
            }

        public async Task<CustomResult> GetAllDimMstsAsync()
            {
            try
                {
                var result = await _db.DimMsts.ToListAsync();
                return new CustomResult(200, "Get all DimMsts success", result);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> GetDimMstByIdAsync( string dimId )
            {
            try
                {
                var result = await _db.DimMsts.SingleOrDefaultAsync(i => i.DimID == dimId);
                return result != null
                    ? new CustomResult(200, "Get DimMst by ID success", result)
                    : new CustomResult(404, "DimMst not found", null);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> CreateDimMstAsync( DimMst dimMst )
            {
            try
                {
                _db.DimMsts.Add(dimMst);
                await _db.SaveChangesAsync();
                return new CustomResult(200, "Create DimMst success", dimMst);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> UpdateDimMstAsync( DimMst dimMst )
            {
            try
                {
                _db.DimMsts.Update(dimMst);
                await _db.SaveChangesAsync();
                return new CustomResult(200, "Update DimMst success", dimMst);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> DeleteDimMstAsync( string dimId )
            {
            try
                {
                var dimMst = await _db.DimMsts.SingleOrDefaultAsync(i => i.DimID == dimId);
                if (dimMst == null)
                    return new CustomResult(404, "DimMst not found", null);

                _db.DimMsts.Remove(dimMst);
                await _db.SaveChangesAsync();

                return new CustomResult(200, "Delete DimMst success", dimMst);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> UpdateVisibility( string dimId )
            {
            try
                {
                var dimMst = await _db.DimMsts.SingleOrDefaultAsync(i => i.DimID == dimId);
                if (dimMst == null)
                    return new CustomResult(404, "DimMst not found", null);

                dimMst.Visible = !dimMst.Visible;
                _db.DimMsts.Update(dimMst);
                await _db.SaveChangesAsync();

                return new CustomResult(200, "Update Visibility success", dimMst);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> GetDimMstsByStyleCodeAsync( string styleCode )
            {
            try
                {
                var result = await _db.DimMsts.Where(d => d.Style_Code == styleCode).ToListAsync();
                return new CustomResult(200, "Get DimMsts by Style Code success", result);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> GetDimMstsByDimQltyIdAsync( string dimQltyId )
            {
            try
                {
                var result = await _db.DimMsts.Where(d => d.DimQlty_ID == dimQltyId).ToListAsync();
                return new CustomResult(200, "Get DimMsts by Quality ID success", result);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> GetDimMstsByDimSubTypeIdAsync( string dimSubTypeId )
            {
            try
                {
                var result = await _db.DimMsts.Where(d => d.DimSubType_ID == dimSubTypeId).ToListAsync();
                return new CustomResult(200, "Get DimMsts by SubType ID success", result);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> GetDimMstsByCreatedAtRangeAsync( DateTime startDate, DateTime endDate )
            {
            try
                {
                var result = await _db.DimMsts.Where(d => d.CreatedAt >= startDate && d.CreatedAt <= endDate).ToListAsync();
                return new CustomResult(200, "Get DimMsts by CreatedAt Range success", result);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> GetVisibleDimMstsAsync()
            {
            try
                {
                var result = await _db.DimMsts.Where(d => d.Visible == true).ToListAsync();
                return new CustomResult(200, "Get Visible DimMsts success", result);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }
        }
    }
