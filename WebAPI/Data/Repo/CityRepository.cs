using System;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using WebAPI.interfaces;

namespace WebAPI.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly DataContext dc;

        // Use specific DataContext instead of the general DbContext
        public CityRepository(DataContext dc)
        {
            this.dc = dc ?? throw new ArgumentNullException(nameof(dc));
        }

        // Use Add (non-async) for adding a city
        public void AddCity(City city)
        {
            if (city == null) throw new ArgumentNullException(nameof(city));
            dc.Cities.Add(city);
        }

        // Handle potential null reference when city is not found
        public void DeleteCity(int cityId)
        {
            var city = dc.Cities.Find(cityId);
            if (city != null)
            {
                dc.Cities.Remove(city);
            }
            else
            {
                // Handle the case or throw an exception if the city does not exist
                throw new InvalidOperationException("City not found");
            }
        }

        // Asynchronously retrieve all cities
        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dc.Cities.ToListAsync();
        }

        // Asynchronously save changes and return a boolean indicating success
        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}
