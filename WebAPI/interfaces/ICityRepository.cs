using System;
using WebAPI.Models;

namespace WebAPI.interfaces
{
	public interface ICityRepository
	{
		Task<IEnumerable<City>> GetCitiesAsync();

		void AddCity(City city);

		void DeleteCity(int CityId);

		Task<City> FindCity(int id);
	}
}

