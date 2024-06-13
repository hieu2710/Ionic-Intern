import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';

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
  validations: any


  constructor(
    private formBuilder: FormBuilder
  ) {
    
  this.validations = {
    'email': [
      { type: 'required', message: 'Bắt buộc nhập' },
      { type: 'email', message: 'Form email wrong', }
    ],
      'username': [
        { type: 'required', message: 'Bắt buộc nhập' },
        { type: 'minlength(5)', message: 'Tên người dùng ít nhất 5 ký tự' },
      ],
      'phone': [
        { type: 'required', message: 'Phone is required.' },
        { type: 'pattern(/^\d{10}$/)', message: 'Số điện thoại phải đủ 10 số' },
      ],
      'password': [
        { type: 'required', message: 'Password is required.' },
        { type: 'minlength', message: 'Username must be at least 10 characters long.' },
        { type: 'pattern', message: 'Your password must contain only numbers and letters.' },
      ],
      'confirmPassword': [
        { type: 'required', message: 'Bắt buộc nhập' },
      ],
      'idCard': [
        { type: 'required', message: 'Bắt buộc nhập' },
        { type: 'pattern', message: 'ID Card phải đủ 12 số' },
      ],
      'address': [
        { type: 'required', message: 'Bắt buộc nhập' },
      ],
      // other validations
    };

    this.signupForm = this.formBuilder.group({
      email: ['@gmail.com', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['',  Validators.compose([
        Validators.minLength(6),
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*[@$!%*?&])(?=.*?[a-z])(?=.*?[0-9]).{10,20}$')
      ])],
      confirmPassword: ['', Validators.required],
      idCard: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      address: ['', Validators.required]
    }, { 
      validator: this.passwordMatchValidator
     });
  }
  
  ngOnInit() {
    this.checkEmailSignUpEnter();
    this.checkPasswordSignUpEnter();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  register() {
    if (this.signupForm.valid) {
      localStorage.setItem('Save in local storage', JSON.stringify(this.signupForm.value));
      console.log('Form Submitted', this.signupForm.value);
    } else {
      console.log('Form not valid');
    }
  }

  isValidEmail = function (emailSignup: string) {
    return (
      /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(emailSignup) ||
      /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(emailSignup)
    );
  };

  checkEmailSignUpEnter() {
    if (this.isValidEmail(this.emailSignup) || this.emailSignup == null) {
      return true;
    }
    return false;
  }

  checkPasswordSignUpEnter() {
    if(this.passwordSignup === "" || this.confirmPasswordSignup === ""){
      return true;
    } else if (this.passwordSignup === this.confirmPasswordSignup) {
      return true;
    }
    return false;
    }

    // if (this.passwordSignup === this.confirmPasswordSignup) {
    //   return true;
    // }
    // return false;
  }




  // randomNumber = Math.floor(Math.random() * 100001000010000) + 2000010000

