using System;
using WebAPI.Models;

namespace WebAPI.interfaces
{
	public interface IUserRepository
	{
        Task<User> Authenticate(string userName, string password);

        void Register(string userName, string password);

        Task<bool> UserAlreadyExists(string userName);
    }
}

