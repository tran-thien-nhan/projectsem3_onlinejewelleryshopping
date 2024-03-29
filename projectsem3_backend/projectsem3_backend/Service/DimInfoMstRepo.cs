﻿using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Helper;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
    {
    public class DimInfoMstRepo : IDimInfoMstRepo
        {
        private readonly DatabaseContext _db;

        public DimInfoMstRepo( DatabaseContext db )
            {
            _db = db;
            }

        public async Task<CustomResult> GetAllDimInfoMsts()
            {
            try
                {
                var result = await _db.DimInfoMsts.ToListAsync();
                if (result == null || result.Count == 0)
                    {
                    return new CustomResult(204, "No content", null);
                    }
                return new CustomResult(200, "Get list success", result);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> GetDimInfoMstById( string id )
            {
            try
                {
                var result = await _db.DimInfoMsts.FindAsync(id);
                if (result == null)
                    {
                    return new CustomResult(404, "Not found", null);
                    }
                return new CustomResult(200, "Get item success", result);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }

        public async Task<CustomResult> CreateDimInfoMst( DimInfoMst dimInfoMst, IFormFile file )
            {
            try
                {
                // Kiểm tra xem dimInfoMst có tồn tại không
                if (dimInfoMst == null)
                    {
                    return new CustomResult(400, "Invalid input. DimInfoMst is null.", null);
                    }

                // Kiểm tra trùng lặp tên DimInfoMst trước khi thêm vào cơ sở dữ liệu
                var existingDimInfoMst = await _db.DimInfoMsts.FirstOrDefaultAsync(d => d.DimType == dimInfoMst.DimType);
                if (existingDimInfoMst != null)
                    {
                    return new CustomResult(400, "DimInfoMst already exists.", null);
                    }

                // Kiểm tra trùng lặp ID của DimInfoMst trước khi thêm vào cơ sở dữ liệu
                var existingDimInfoMstWithSameID = await _db.DimInfoMsts.FirstOrDefaultAsync(d => d.DimID == dimInfoMst.DimID);
                if (existingDimInfoMstWithSameID != null)
                    {
                    return new CustomResult(400, "Another DimInfoMst with the same ID already exists.", null);
                    }

                // Kiểm tra trùng lặp DimImg
                if (file != null)
                    {
                    string imageName = FileUpload.ProcessImageName(file.FileName);
                    var dimInfoList = await _db.DimInfoMsts.ToListAsync(); // Lấy danh sách tất cả DimInfoMsts từ cơ sở dữ liệu

                    var existingDimImg = dimInfoList.FirstOrDefault(d => FileUpload.ProcessImageName(d.DimImg) == imageName);
                    if (existingDimImg != null)
                        {
                        return new CustomResult(400, "Another DimInfoMst with the same DimImg already exists.", null);
                        }
                    }

                // Tạo mới một DimID
                dimInfoMst.DimID = Guid.NewGuid().ToString();

                // Kiểm tra và lưu ảnh nếu có
                if (file != null)
                    {
                    dimInfoMst.DimImg = FileUpload.SaveImages("dimInfoMstImage", file);
                    }

                // Thiết lập thời gian tạo và cập nhật
                dimInfoMst.CreatedAt = DateTime.Now;
                dimInfoMst.UpdatedAt = DateTime.Now;

                // Thêm dimInfoMst vào cơ sở dữ liệu
                _db.DimInfoMsts.Add(dimInfoMst);
                await _db.SaveChangesAsync();

                return new CustomResult(201, "Create Success", dimInfoMst);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }



        public async Task<CustomResult> UpdateDimInfoMst( DimInfoMst dimInfoMst, IFormFile file )
            {
            try
                {
                var existingDimInfo = await _db.DimInfoMsts.FindAsync(dimInfoMst.DimID);
                if (existingDimInfo == null)
                    {
                    return new CustomResult(404, "Not Found", null);
                    }

                existingDimInfo.DimType = dimInfoMst.DimType;
                existingDimInfo.DimSubType = dimInfoMst.DimSubType;
                existingDimInfo.DimCrt = dimInfoMst.DimCrt;
                existingDimInfo.DimPrice = dimInfoMst.DimPrice;
                existingDimInfo.DimYear = dimInfoMst.DimYear;

                // Check if a new image file is provided
                if (file != null)
                    {
                    // Save the new image and update the DimImg property
                    existingDimInfo.DimImg = FileUpload.SaveImages("dimInfoMstImage", file);
                    }

                existingDimInfo.UpdatedAt = DateTime.Now;

                _db.Entry(existingDimInfo).State = EntityState.Modified;
                await _db.SaveChangesAsync();

                return new CustomResult(200, "Update Success", existingDimInfo);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }



        public async Task<CustomResult> DeleteDimInfoMst( string id )
            {
            try
                {
                var dimInfo = await _db.DimInfoMsts.SingleOrDefaultAsync(i => i.DimID == id);
                if (dimInfo == null)
                    {
                    return new CustomResult(404, "Item not found", null);
                    }
                else
                    {
                    _db.DimInfoMsts.Remove(dimInfo);
                    var result = await _db.SaveChangesAsync();
                    return result == 1 ? new CustomResult(200, "Delete Success", dimInfo) : new CustomResult(201, "Delete Error", null);
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
                var dimInfo = await _db.DimInfoMsts.FindAsync(id);
                if (dimInfo == null)
                    {
                    return new CustomResult(404, "Not Found", null);
                    }

                dimInfo.Visible = !dimInfo.Visible;

                _db.Entry(dimInfo).State = EntityState.Modified;
                await _db.SaveChangesAsync();

                return new CustomResult(200, "Update Success", dimInfo);
                }
            catch (Exception e)
                {
                return new CustomResult(500, e.Message, null);
                }
            }
        }
    }
