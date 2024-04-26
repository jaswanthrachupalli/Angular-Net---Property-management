using System;
namespace WebAPI.interfaces
{
	public interface IUnitOfWork
	{
		ICityRepository cityRepository { get; }
		IUserRepository userRepository { get; }
		Task<bool> SaveAsync();
	}
}

