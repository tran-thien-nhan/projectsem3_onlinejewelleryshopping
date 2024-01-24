using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using projectsem3_backend.data;
using projectsem3_backend.Repository;
using projectsem3_backend.Service;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

//đăng ký connection
builder.Services.AddDbContext<DatabaseContext>(opts =>
    opts.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection"))
);

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

//Nhan
builder.Services.AddScoped<IItemMstRepo, ItemMstRepo>();
builder.Services.AddScoped<ICartRepo, CartRepo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();

//Phi
builder.Services.AddScoped<ICatMstRepo, CatMstRepo>();
builder.Services.AddScoped<IGoldKrtMstRepo, GoldKrtMstRepo>();
builder.Services.AddScoped<IBrandMstRepo, BrandMstRepo>();
builder.Services.AddScoped<IStoneQltyMstRepo, StoneQltyMstRepo>();
builder.Services.AddScoped<IStoneMstRepo, StoneMstRepo>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Uploads")),
    RequestPath = "/Uploads"
});

app.UseHttpsRedirection();

app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
