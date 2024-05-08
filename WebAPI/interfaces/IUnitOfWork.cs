using System;
namespace WebAPI.interfaces
{
	public interface IUnitOfWork
	{
		ICityRepository cityRepository { get; }
		IUserRepository userRepository { get; }
        IPropertyRepository PropertyRepository { get; }
        Task<bool> SaveAsync();
    }
}

