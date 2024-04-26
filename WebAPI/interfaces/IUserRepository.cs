using System;
using WebAPI.Models;

namespace WebAPI.interfaces
{
	public interface IUserRepository
	{
        Task<User> Authenticate(string userName, string password);    }
}

