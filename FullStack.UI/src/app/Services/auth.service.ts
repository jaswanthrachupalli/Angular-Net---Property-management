import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: { username: string, password: string }) {
    let userArray: { username: string, password: string }[] = [];
    const storedUsers = localStorage.getItem('users');

    if (storedUsers) {
      try {
        userArray = JSON.parse(storedUsers);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
      }
    }

    return userArray.find(u => u.username === user.username && u.password === user.password);
  }
}
