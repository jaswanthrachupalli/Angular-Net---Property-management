using Microsoft.AspNetCore.Mvc;
using WebAPI.interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class cityController : ControllerBase
    {
        private readonly IUnitOfWork uow;

        public cityController( IUnitOfWork uow)
        {
            this.uow = uow;
        }
        [HttpGet]

        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.cityRepository.GetCitiesAsync();
            return Ok(cities);
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city)
        {
            uow.cityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.cityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }

    }

}

