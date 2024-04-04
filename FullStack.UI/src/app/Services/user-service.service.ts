import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

constructor() { }

adduser(newUser: any) {
  let users: any[] = [];

  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
}

}
