﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using projectsem3_backend.data;
using System.Threading.Tasks; 

namespace projectsem3_backend.Helper
{
    public class UpdateStatus<T> where T : class, IVisibleEntity
    {
        private readonly DatabaseContext db;

        public UpdateStatus(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<T> UpdateStatusObject(int id)
        {
            var entity = await db.Set<T>().FindAsync(id);
            if (entity != null)
            {
                entity.Visible = !entity.Visible;
                db.Set<T>().Update(entity);
                await db.SaveChangesAsync();
            }
            return entity;
        }
    }
}
