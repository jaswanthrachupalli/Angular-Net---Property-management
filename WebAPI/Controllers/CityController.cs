using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
<<<<<<< HEAD
using WebAPI.Data.Repo;
=======
>>>>>>> dev
using WebAPI.Models;


namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class cityController : ControllerBase
    {
        private readonly ICityRepository repo;

        public cityController( ICityRepository repo)
        {
            this.repo = repo;
        }
        [HttpGet]

        public async Task<IActionResult> GetCities()
        {
<<<<<<< HEAD
            var cities = await repo.GetCitiesAsync();
            return Ok(cities);
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city)
        {
            repo.AddCity(city);
            await repo.SaveAsync();
            return StatusCode(201);
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            repo.DeleteCity(id);
            await repo.SaveAsync();
            return Ok(id);
        }

=======
            var cities = await dc.Cities.ToListAsync();
            return Ok(cities);
        }

        [HttpPost("add")]
        [HttpPost("add/{cityname}")]

        //
        public async Task<IActionResult> AddCity(string cityName)

        {
            City city = new City();
            city.Name = cityName;
            await dc.Cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }

        [HttpPost("post")]


        public async Task<IActionResult> AddCity(City city)

        {
            //City city = new City();
            //city.Name = cityName;
            await dc.Cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)

        {
            var city = await dc.Cities.FindAsync(id);
            dc.Cities.Remove(city);
            await dc.SaveChangesAsync();
            return Ok(id);
        }
>>>>>>> dev
    }

}

