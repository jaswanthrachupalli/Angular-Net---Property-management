using System;
namespace WebAPI.interfaces
{
	public interface IUnitOfWork
	{
		ICityRepository cityRepository { get; }
		Task<bool> SaveAsync();
	}
}

