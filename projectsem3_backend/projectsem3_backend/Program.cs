using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using projectsem3_backend.data;
using projectsem3_backend.Models.Momo;
using projectsem3_backend.Repository;
using projectsem3_backend.Service;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

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
    {
        opts.UseSqlServer(builder.Configuration.GetConnectionString("MyConnection"));
        //opts.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        opts.EnableSensitiveDataLogging();
    }
);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(op =>
    {
        op.RequireHttpsMetadata = false;
        op.SaveToken = true;
        op.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

//Nhan
builder.Services.AddScoped<IItemMstRepo, ItemMstRepo>();
builder.Services.AddScoped<ICartRepo, CartRepo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<IOrderRepo, OrderRepo>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IExcelHandler, ExcelHandler>();
builder.Services.Configure<MomoOptionModel>(builder.Configuration.GetSection("MomoAPI"));
builder.Services.AddScoped<IMomoService, MomoRepo>();
builder.Services.AddScoped<IAdminRepo, AdminRepo>();

builder.Services.AddTransient<EmailService>(); //<-- thêm đúng dòng này

//Phi
builder.Services.AddScoped<ICatMstRepo, CatMstRepo>();
builder.Services.AddScoped<IGoldKrtMstRepo, GoldKrtMstRepo>();
builder.Services.AddScoped<IBrandMstRepo, BrandMstRepo>();
builder.Services.AddScoped<IStoneQltyMstRepo, StoneQltyMstRepo>();
builder.Services.AddScoped<IStoneMstRepo, StoneMstRepo>();
builder.Services.AddScoped<ICertifyMstRepo, CertifyMstRepo>();


//Hung
builder.Services.AddScoped<IDimQltyMstRepo, DimQltyMstRepo>();
builder.Services.AddScoped<IDimMstRepo, DimMstRepo>();
builder.Services.AddScoped<IDimQltySubMstRepo, DimQltySubMstRepo>();
builder.Services.AddScoped<IProdMstRepo, ProMstRepo>();
/*builder.Services.AddScoped<IDimInfoMstRepo, DimInfoMstRepo>();*/
builder.Services.AddScoped<IJewelRepo, JewelRepo>();

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

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
