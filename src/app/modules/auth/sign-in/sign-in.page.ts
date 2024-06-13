import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public submitAttempt: boolean = false;
  public slideOneForm: FormGroup;
  isModalOpen = false;
  public usersData: any


  ngOnInit() {
    this.renderUser()
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
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

  renderUser() {
    this.userService.getUsers().subscribe(
      (res: any) => {
        // if(res && Array.isArray(res.data)){
        //   this.usersData = res.data.map((item: any) => item)
        //   console.log("usersData", this.usersData)
        // } else {
        //   console.log("Unexpected response structure", res);
        // }
        this.usersData = res
      }, (error: any) => {
        console.error("sadasd")
      }
    )
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

}