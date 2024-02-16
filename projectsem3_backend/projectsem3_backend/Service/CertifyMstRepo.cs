using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Models;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class CertifyMstRepo : ICertifyMstRepo
    {
        private readonly DatabaseContext db;

        public CertifyMstRepo(DatabaseContext db)
        {
            this.db = db;
        }
        public async Task<CustomResult> CreateCertifytMst(CertifyMst newCertifyMst)
        {
            try
            {
                newCertifyMst.Certify_ID = Guid.NewGuid().ToString();
                // Thiết lập thời gian tạo và cập nhật
                newCertifyMst.CreatedAt = DateTime.Now;
                newCertifyMst.UpdatedAt = DateTime.Now;


                await db.CertifyMsts.AddAsync(newCertifyMst);
                var result = await db.SaveChangesAsync();
                if (result == 1)
                {
                    return new CustomResult(200, "Create New Certification Success", newCertifyMst);
                }
                else
                {
                    return new CustomResult(201, "Create New Certification Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> DeleteCertifyMst(string id)
        {
            try
            {
                var certify = await db.CertifyMsts.SingleOrDefaultAsync(i => i.Certify_ID == id);
                if (certify == null)
                {
                    return new CustomResult(201, "Not Found Certification", null);
                }
                else
                {
                    db.CertifyMsts.Remove(certify);
                    var result = await db.SaveChangesAsync();
                    if (result == 1)
                    {
                        return new CustomResult(200, "Delete Certification Success", certify);
                    }
                    return new CustomResult(201, "Delete Certification Error", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(402, ex.Message, null);
            }
        }

        public async Task<CustomResult> GetAllCertifyMst()
        {
            try
            {
                var result = await db.CertifyMsts.ToListAsync();
                if (result == null)
                {
                    return new CustomResult(401, "Certification Create Something wrong", null);
                }
                else if (result.Count == 0) // Sửa lại điều kiện kiểm tra độ dài của danh sách
                {
                    return new CustomResult(204, "List Certification is empty", result); // Thay đổi mã trạng thái 201 thành 204 nếu danh sách trống rỗng
                }
                else
                {
                    return new CustomResult(200, "Get list Certification success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetCertifyMstById(string id)
        {
            try
            {
                var result = await db.CertifyMsts.SingleOrDefaultAsync(i => i.Certify_ID == id);
                if (result == null)
                {
                    return new CustomResult(401, "not found Certify_ID", null);
                }
                else
                {
                    return new CustomResult(200, "Get Certification success", result);
                }
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> UpdateCertifyMst(CertifyMst certifyMst)
        {
            try
            {
                var certify = await db.CertifyMsts.SingleOrDefaultAsync(i => i.Certify_ID == certifyMst.Certify_ID);
                if (certify == null)
                {
                    return new CustomResult(201, "Not Found Certification For Update", null);
                }

                //cập nhật thông tin
                certify.Certify_ID = certifyMst.Certify_ID;
                certify.Certify_Type = certifyMst.Certify_Type;
                certify.Visible = certifyMst.Visible;

                //cập nhật thời gian cập nhật
                certify.UpdatedAt = DateTime.Now;


                //cập nhật item
                db.CertifyMsts.Update(certify);
                var result = await db.SaveChangesAsync();

                if (result == 1)
                {
                    return new CustomResult(200, "Update Certification Success", certify);
                }
                else
                {
                    return new CustomResult(201, "No changes of Certification were made in the database", null);
                }
            }
            catch (Exception ex)
            {
                return new CustomResult(500, ex.Message, null);
            }
        }

        public async Task<CustomResult> UpdateCertifyVisibility(string id)
        {
            try
            {
                var certify = await db.CertifyMsts.SingleOrDefaultAsync(i => i.Certify_ID == id);
                if (certify == null)
                {
                    return new CustomResult(201, "Not Found Certification", null);
                }
                else
                {
                    try
                    {
                        certify.Visible = !certify.Visible;

                        db.CertifyMsts.Update(certify);

                        var result = await db.SaveChangesAsync();
                        if (result == 1)
                        {
                            return new CustomResult(200, "Update Certification Success", certify);
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
