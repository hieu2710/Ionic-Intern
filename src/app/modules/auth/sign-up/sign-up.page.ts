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


  constructor(private FormBuilder: FormBuilder) {
    this.formCheckSignUp = this.FormBuilder.group({
      password: [ '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ])

      ]
    })
  }

  
  ngOnInit() {
    this.checkEmailSignUpEnter();
    this.checkPasswordSignUpEnter();
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

