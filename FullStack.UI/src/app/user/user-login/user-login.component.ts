import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { AuthService } from 'src/app/Services/auth.service';
import { UserForLogin } from 'src/app/model/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
    this.authService.authUser(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        const user = response;    
        localStorage.setItem('token', user.token);
        localStorage.setItem('userName', user.userName);
        this.alertify.success('Login Successful');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.alertify.error(error.error);

      }
    );
    // if (token) {
    //   localStorage.setItem('token', token.username)
    //   this.alertify.success('Login Successful');
    //   this.router.navigate(['/']);
    // } else {
    //   this.alertify.error('Login Failed');
    // }
  }

}
