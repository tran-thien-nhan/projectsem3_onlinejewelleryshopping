using Microsoft.EntityFrameworkCore;
using projectsem3_backend.CustomStatusCode;
using projectsem3_backend.data;
using projectsem3_backend.Repository;

namespace projectsem3_backend.Service
{
    public class JewelRepo : IJewelRepo
    {
        private readonly DatabaseContext db;

        public JewelRepo(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<CustomResult> GetAll()
        {
            try
            {
                var jewel = await db.JewelTypeMsts.ToListAsync();
                return new CustomResult(200, "Success", jewel);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }

        public async Task<CustomResult> GetById(string id)
        {
            try
            {
                var jewel = await db.JewelTypeMsts.SingleOrDefaultAsync(i => i.Jewellery_ID == id);
                if (jewel == null)
                {
                    return new CustomResult(404, "Jewel Not Found", null);
                }
                return new CustomResult(200, "Success", jewel);
            }
            catch (Exception e)
            {
                return new CustomResult(500, e.Message, null);
            }
        }
    }
}
