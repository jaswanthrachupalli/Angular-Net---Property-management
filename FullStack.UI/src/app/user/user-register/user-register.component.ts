import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, Validators.required),
    mobile: new FormControl(null, [Validators.required, Validators.maxLength(10)])
  }, { validators: this.passwordMatchingValidator });

  constructor() { }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.registerationForm);
  }

  private passwordMatchingValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
    return password.value === confirmPassword.value ? null : { notmatched: true };
  }
}
