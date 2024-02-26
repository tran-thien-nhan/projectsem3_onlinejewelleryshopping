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
        private readonly DatabaseContext db;

        public DimMstRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<CustomResult> CreateDimMstAsync(DimMst dimMst)
        {
            try
            {
                // Tạo một giá trị GUID mới cho DimMst_ID
                dimMst.DimMst_ID = Guid.NewGuid().ToString();

                // Thiết lập thời gian tạo và cập nhật
                dimMst.CreatedAt = DateTime.Now;
                dimMst.UpdatedAt = DateTime.Now;

                // Check for the existence of related entities
                var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == dimMst.Style_Code);
                var dimQltySubMst = await db.DimQltySubMsts.SingleOrDefaultAsync(d => d.DimSubType_ID == dimMst.DimSubType_ID);
                var dimQltyMst = await db.DimQltyMsts.SingleOrDefaultAsync(d => d.DimQlty_ID == dimMst.DimQlty_ID);
                var dimInfoMst = await db.DimInfoMsts.SingleOrDefaultAsync(d => d.DimID == dimMst.DimID);

                // Assign related entities
                dimMst.ItemMst = item;
                dimMst.DimQltySubMst = dimQltySubMst;
                dimMst.DimQltyMst = dimQltyMst;
                dimMst.DimInfoMst = dimInfoMst;

                // Set default value for Visible
                dimMst.Visible = false;

                // Add the new DimMst
                await db.DimMsts.AddAsync(dimMst);
                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "Create New DimMst Success", dimMst);
                }
                else
                {
                    return new CustomResult(201, "Create New DimMst Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }


        public async Task<CustomResult> GetAllDimMstsAsync()
        {
            try
            {
                var result = await db.DimMsts.
                    Include(d => d.ItemMst).
                    ToListAsync();
                return new CustomResult(200, "Get all DimMsts success", result);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetDimMstByIdAsync(string dimId)
        {
            try
            {
                var result = await db.DimMsts.SingleOrDefaultAsync(i => i.DimMst_ID == dimId);
                return result != null
                    ? new CustomResult(200, "Get DimMst by ID success", result)
                    : new CustomResult(404, "DimMst not found", null);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateDimMstAsync(DimMst dimMst)
        {
            try
            {
                var dim = await db.DimMsts.SingleOrDefaultAsync(i => i.DimMst_ID == dimMst.DimMst_ID);
                if (dim == null)
                {
                    return new CustomResult(404, "DimMst not found", null);
                }

                // Update the information
                dim.UpdatedAt = DateTime.Now;
                dim.Dim_Crt = dimMst.Dim_Crt;
                dim.Dim_Pcs = dimMst.Dim_Pcs;
                dim.Dim_Gm = dimMst.Dim_Gm;
                dim.Dim_Size = dimMst.Dim_Size;
                dim.Dim_Rate = dimMst.Dim_Rate;
                dim.Dim_Amt = dimMst.Dim_Amt;
                dim.Visible = dimMst.Visible;

                // Check for the existence of related entities
                var item = await db.ItemMsts.SingleOrDefaultAsync(i => i.Style_Code == dimMst.Style_Code);
                var dimQltySubMst = await db.DimQltySubMsts.SingleOrDefaultAsync(d => d.DimSubType_ID == dimMst.DimSubType_ID);
                var dimQltyMst = await db.DimQltyMsts.SingleOrDefaultAsync(d => d.DimQlty_ID == dimMst.DimQlty_ID);
                var dimInfoMst = await db.DimInfoMsts.SingleOrDefaultAsync(d => d.DimID == dimMst.DimID);

                // Assign related entities
                dim.ItemMst = item;
                dim.DimQltySubMst = dimQltySubMst;
                dim.DimQltyMst = dimQltyMst;
                dim.DimInfoMst = dimInfoMst;

                // Update the DimMst entity
                db.DimMsts.Update(dim);
                await db.SaveChangesAsync();

                return new CustomResult(200, "Update DimMst success", dim);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }


        public async Task<CustomResult> DeleteDimMstAsync(string dimId)
        {
            try
            {
                var existingDimMst = await db.DimMsts.SingleOrDefaultAsync(i => i.DimMst_ID == dimId);
                if (existingDimMst == null)
                {
                    return new CustomResult(404, "DimMst not found", null);
                }

                db.DimMsts.Remove(existingDimMst);
                await db.SaveChangesAsync();

                return new CustomResult(200, "Delete DimMst success", existingDimMst);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateDimVisibility(string dimId)
        {
            try
            {
                var existingDimMst = await db.DimMsts.SingleOrDefaultAsync(i => i.DimMst_ID == dimId);
                if (existingDimMst == null)
                {
                    return new CustomResult(404, "DimMst not found", null);
                }

                existingDimMst.Visible = !existingDimMst.Visible;
                db.DimMsts.Update(existingDimMst);
                await db.SaveChangesAsync();

                return new CustomResult(200, "Update Visibility success", existingDimMst);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }
    }
}
