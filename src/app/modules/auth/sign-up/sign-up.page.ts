import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['@gmail.com', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      idCart: ['', Validators.required],
      address: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
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

