using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.data;
using System.Threading.Tasks;

namespace projectsem3_backend.Helper
{
    public class UpdateStatus<T> where T : class, IVisibleEntity
    {
        private readonly DatabaseContext _db;

        public UpdateStatus(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<T> UpdateStatusObject(int id)
        {
            var entity = await _db.Set<T>().FindAsync(id);

            if (entity != null)
            {
                entity.Visible = !entity.Visible;
                _db.Set<T>().Update(entity);
                await _db.SaveChangesAsync();
            }

            return entity;
        }
    }
}
