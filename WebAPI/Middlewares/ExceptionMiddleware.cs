using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebAPI.Errors;

namespace WebAPI.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;
        private readonly IHostEnvironment env;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            this.env = env;
            this.next = next;
            this.logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var (statusCode, message) = DetermineStatusCodeAndMessage(ex);
            var response = env.IsDevelopment()
                ? new ApiError((int)statusCode, ex.Message, ex.StackTrace)
                : new ApiError((int)statusCode, message);

            logger.LogError(ex, "An error occurred processing your request.");
            context.Response.StatusCode = (int)statusCode;
            context.Response.ContentType = "application/json";
            var jsonResponse = JsonSerializer.Serialize(response);
            await context.Response.WriteAsync(jsonResponse);
        }

        private (HttpStatusCode, string) DetermineStatusCodeAndMessage(Exception ex)
        {
            return ex switch
            {
                UnauthorizedAccessException _ => (HttpStatusCode.Forbidden, "You are not authorized"),
                // Add more specific exceptions here
                _ => (HttpStatusCode.InternalServerError, "An unknown error occurred")
            };
        }
    }
}
