import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/user-service.service';  // Ensure it's used or remove if unnecessary
import { UserForRegister } from 'src/app/model/user';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  user!: UserForRegister;
  userSubmitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    }, { validators: this.passwordMatchingValidator });
  }

  passwordMatchingValidator(fg: FormGroup): ValidationErrors | null {
    const password = fg.get('password');
    const confirmPassword = fg.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { notmatched: true };
  }

  onSubmit() {
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      this.user = this.userData();
      this.authService.registerUser(this.user).subscribe(
        () => {
          this.alertify.success('Congrats, you are successfully registered');
          this.onReset();
        },
        error => {
          console.error('Registration failed:', error);
          this.alertify.error('Registration failed');
        }
      );
    }
  }

  onReset() {
    this.userSubmitted = false;
    this.registrationForm.reset();
  }

  userData(): UserForRegister {
    return {
      userName: this.registrationForm.get('userName')?.value,
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
      confirmPassword: this.registrationForm.get('confirmPassword')?.value,

      mobile: this.registrationForm.get('mobile')?.value
    };
  }
}
