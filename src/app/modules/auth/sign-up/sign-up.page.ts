import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  emailSignup: any;
  passwordSignup: any;
  confirmPasswordSignup: any;
  myForm: any;
  formCheckSignUp: any;
  signupForm: FormGroup;
  validations: any;
  address: string | undefined;
  email: any;
  password: any;
  username: any;
  token: string | null = null;
  protectedData: any;
  phone: any;
  fullname: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.validations = {
      email: [
        { type: 'required', message: 'Bắt buộc nhập' },
        { type: 'email', message: 'Form email wrong' },
      ],
      username: [
        { type: 'required', message: 'Bắt buộc nhập' },
        { type: 'minlength(5)', message: 'Tên người dùng ít nhất 5 ký tự' },
      ],
      phone: [
        { type: 'required', message: 'Phone is required.' },
        { type: 'pattern(/^d{10}$/)', message: 'Số điện thoại phải đủ 10 số' },
      ],
      password: [
        { type: 'required', message: 'Password is required.' },
        {
          type: 'minlength',
          message: 'Username must be at least 10 characters long.',
        },
        {
          type: 'pattern',
          message: 'Your password must contain only numbers and letters.',
        },
      ],
      confirmPassword: [{ type: 'required', message: 'Bắt buộc nhập' }],
      fullname: [
        { type: 'required', message: 'Bắt buộc nhập' },
        { type: 'minLength', message: 'ID Card phải đủ 12 số' },
      ],
      address: [{ type: 'required', message: 'Bắt buộc nhập' }],
    };
    this.signupForm = this.formBuilder.group({
      email: ['@gmail.com', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['',  Validators.compose([
        Validators.minLength(10),
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*[@$!%*?&])(?=.*?[a-z])(?=.*?[0-9]).{10,20}$')
      ])],
      confirmPassword: ['', Validators.required],
      fullname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', Validators.required]
    }, { 
      validator: this.passwordMatchValidator
     });

  }

  ngOnInit() {
    this.signupForm;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  getDataToSignUp() {
    const dataSignUp = {
      username: this.username,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      name: this.fullname,
    };
    this.userService.postUsers(dataSignUp).subscribe(
      (res: any) => {
        console.log('success', res);
      },
      (err: any) => {
        console.error('failed', err);
      }
    );
  }
}

