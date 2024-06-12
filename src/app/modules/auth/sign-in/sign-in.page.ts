import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public submitAttempt: boolean = false;
  public slideOneForm: FormGroup;
  isModalOpen = false;

  constructor(private formBuilder: FormBuilder) {
    this.slideOneForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('[a-zA-Z0-9 ]*')
        ])
      ],
      pass: ['', Validators.required]
    });
  }

  check() {
    if (!this.slideOneForm.valid) {
      this.submitAttempt = true;
    } else {
      this.submitAttempt = false;
    }
  }

  verify() {
    if (!this.submitAttempt) {
      if (this.slideOneForm.value.username === 'huuminh123' && this.slideOneForm.value.pass === 'Minh123') {
        this.isModalOpen = true;
        setTimeout(() => {
          window.location.assign("./")
        }, 2000);
      } else {
        alert('Undefined');
      }
    }
  }
  login() {
    this.check();
    this.verify();
    
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
}