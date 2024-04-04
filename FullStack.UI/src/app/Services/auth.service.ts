import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }
authUser(user: any) {
  let userArray = [];
  const storedUsers = localStorage.getItem('user');

  if (storedUsers) {
    try {
      userArray = JSON.parse(storedUsers);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  }

  // Ensure that userArray contains valid user objects before attempting to find a user
  if (Array.isArray(userArray)) {
    return userArray.find(p => p.username === user.username && p.password === user.password);
  } else {
    return null; // or handle the case where userArray is not an array
  }
}



}
