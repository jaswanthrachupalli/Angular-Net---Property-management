import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { UserForLogin, UserForRegister } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  authUser(user: UserForLogin) {
    return this.http.post(this.baseUrl + '/account/login', user);
    

  //   let userArray: { username: string, password: string }[] = [];
  //   const storedUsers = localStorage.getItem('users');

  //   if (storedUsers) {
  //     try {
  //       userArray = JSON.parse(storedUsers);
  //     } catch (error) {
  //       console.error('Error parsing user data from localStorage:', error);
  //       return null;
  //     }
  //   }

  //   return userArray.find(u => u.username === user.username && u.password === user.password);
   }
   registerUser(user: UserForRegister) {
    return this.http.post(this.baseUrl + '/account/register', user);
}
}
