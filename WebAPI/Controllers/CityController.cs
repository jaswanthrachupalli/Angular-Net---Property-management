using Microsoft.AspNetCore.Mvc;
using WebAPI.Dtos;
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
            var citiesDto = from c in cities
                             select new CityDto()
                             {
                                 Id = c.Id,
                                 Name = c.Name
                             };
            return Ok(citiesDto);
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = new City
            {
                Name = cityDto.Name,
                LastUpdatedBy = 1,
                LastUpdatedOn = DateTime.Now

            };
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

