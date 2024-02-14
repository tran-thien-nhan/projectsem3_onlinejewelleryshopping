using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
    {
    public class JewelRepo : IJewelRepo
        {
        private readonly DatabaseContext _db;

        public JewelRepo( DatabaseContext db )
            {
            _db = db;
            }

        public async Task<CustomResult> GetAllJewelTypes()
            {
            try
                {
                var jewelTypes = await _db.JewelTypeMsts.ToListAsync();
                return new CustomResult(200, "Success", jewelTypes);
                }
            catch (Exception ex)
                {
                return HandleDbException(ex, null);
                }
            }

        public async Task<CustomResult> GetJewelTypeById( string id )
            {
            try
                {
                var jewelType = await _db.JewelTypeMsts.SingleOrDefaultAsync(j => j.Jewellery_ID == id);
                if (jewelType != null)
                    {
                    return new CustomResult(200, "Success", jewelType);
                    }
                else
                    {
                    return new CustomResult(404, "Not Found", null);
                    }
                }
            catch (Exception ex)
                {
                return HandleDbException(ex, null);
                }
            }

        public async Task<CustomResult> CreateJewelType( JewelTypeMst jewelType )
            {
            try
                {
                if (jewelType == null)
                    {
                    return new CustomResult(400, "Invalid input. JewelTypeMst is null.", null);
                    }

                // Tạo một Jewellery_ID mới
                jewelType.Jewellery_ID = Guid.NewGuid().ToString();

                // Thiết lập thời gian tạo và cập nhật
                jewelType.CreatedAt = DateTime.Now;
                jewelType.UpdatedAt = DateTime.Now;

                _db.JewelTypeMsts.Add(jewelType);
                await _db.SaveChangesAsync();

                return new CustomResult(200, "Create Success", jewelType);
                }
            catch (Exception ex)
                {
                return HandleDbException(ex, jewelType);
                }
            }

        public async Task<CustomResult> UpdateJewelType( JewelTypeMst jewelType )
            {
            try
                {
                if (jewelType == null)
                    {
                    return new CustomResult(400, "Invalid input. JewelTypeMst is null.", null);
                    }

                var existingJewelType = await _db.JewelTypeMsts.SingleOrDefaultAsync(j => j.Jewellery_ID == jewelType.Jewellery_ID);

                if (existingJewelType != null)
                    {
                    // Cập nhật thông tin
                    existingJewelType.Jewellery_Type = jewelType.Jewellery_Type;

                    // Cập nhật thời gian cập nhật
                    existingJewelType.UpdatedAt = DateTime.Now;

                    // Cập nhật JewelTypeMst
                    _db.JewelTypeMsts.Update(existingJewelType);
                    var result = await _db.SaveChangesAsync();

                    if (result == 1)
                        {
                        return new CustomResult(200, "Update Success", existingJewelType);
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
                return HandleDbException(ex, jewelType);
                }
            }

        public async Task<CustomResult> DeleteJewelType( string id )
            {
            try
                {
                var jewelType = await _db.JewelTypeMsts.SingleOrDefaultAsync(j => j.Jewellery_ID == id);

                if (jewelType != null)
                    {
                    _db.JewelTypeMsts.Remove(jewelType);
                    await _db.SaveChangesAsync();
                    return new CustomResult(200, "Delete Success", jewelType);
                    }

                return new CustomResult(404, "Not Found", null);
                }
            catch (Exception ex)
                {
                return HandleDbException(ex, null);
                }
            }

        public async Task<CustomResult> UpdateVisibility( string id )
            {
            try
                {
                var jewelType = await _db.JewelTypeMsts.SingleOrDefaultAsync(j => j.Jewellery_ID == id);

                if (jewelType == null)
                    {
                    return new CustomResult(404, "Not Found", null);
                    }
                else
                    {
                    try
                        {
                        jewelType.Visible = !jewelType.Visible;

                        _db.JewelTypeMsts.Update(jewelType);

                        var result = await _db.SaveChangesAsync();
                        if (result == 1)
                            {
                            return new CustomResult(200, "Update Success", jewelType);
                            }
                        return new CustomResult(201, "No changes were made in the database", null);
                        }
                    catch (Exception ex)
                        {
                        return HandleDbException(ex, jewelType);
                        }
                    }
                }
            catch (Exception e)
                {
                return new CustomResult(402, e.Message, null);
                }
            }

        private CustomResult HandleDbException( Exception ex, JewelTypeMst jewelType )
            {
            if (ex is DbUpdateException dbUpdateException && ex.InnerException is SqlException sqlException)
                {
                if (sqlException.Number == 2627)
                    {
                    return new CustomResult(409, "Duplicate entry. Another JewelTypeMst with the same key already exists.", null);
                    }
                }

            return new CustomResult(500, ex.Message, null);
            }

        }
    }
