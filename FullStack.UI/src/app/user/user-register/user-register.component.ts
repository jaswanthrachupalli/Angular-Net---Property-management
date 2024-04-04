import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerationForm: FormGroup;
  user: any = {};
  userSubmitted?: boolean;

  constructor(private fb: FormBuilder, private userservice: UserServiceService) {
    this.registerationForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(10)]]
    }, { validators: this.passwordMatchingValidator });
  }
  passwordMatchingValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (!password || !confirmPassword) {
      return null;
    }
  
    return password.value === confirmPassword.value ? null : { notmatched: true };
  }
  

  ngOnInit(): void {
    // Initialization can also be done here if needed
  }

  onSubmit() {
    console.log(this.registerationForm);
    this.userSubmitted = true;
    if (this.registerationForm.valid) {
    this.user = Object.assign(this.user,this.registerationForm.value);
    this.userservice.adduser(this.user);
    this.registerationForm.reset();
    this.userSubmitted = false;
  }
}
}
