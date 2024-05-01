using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Data.Repo;
using WebAPI.interfaces;
using AutoMapper;
using WebAPI.Helpers;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using WebAPI.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Text;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }


    public void ConfigureServices(IServiceCollection services)
    {
        // Add CORS services

        services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
        });

        services.AddDbContext<DataContext>(options =>
        options.UseSqlServer(Configuration.GetConnectionString("Default")));

        // Add other services...
        services.AddControllersWithViews().AddNewtonsoftJson();

        var secretKey = Configuration.GetSection("AppSettings:Key").Value;
        var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey));

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt => {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = key
                };
            });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

        app.ConfigureExceptionHandler(env);
        app.UseHsts();

        


        // Enable CORS
        app.UseCors("AllowAll");

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        app.UseAuthentication(); 

        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
               
        });
    }
}
