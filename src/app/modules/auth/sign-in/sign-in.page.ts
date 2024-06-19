import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public submitAttempt: boolean = false;
  public slideOneForm: FormGroup;
  isModalOpen = false;
  public usersData: any;
  match_user: User | undefined;
  verify = false;
// eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private userService: UserService,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.slideOneForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ]),
      ],
      pass: ['', Validators.required],
    });
  }
//check button click without fill
  async check() {
    if (!this.slideOneForm.valid) {
      this.submitAttempt = true;
    } else {
      this.submitAttempt = false;
      const loading = await this.loadingController.create({
        message: 'Checking...',
        duration: 2500,
      });
      await loading.present();
    }
  }
//  Select user in api
  renderUser() {
    var current_username = (
      document.getElementById('username') as HTMLInputElement
    ).value;
    this.userService.getUsers().subscribe(
      (res: User[]) => {
        this.usersData = res;
        this.match_user = this.usersData.find(
          (user: any) => user.username === current_username,
          console.log(this.match_user) //
        );
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }
//  check pwd of user, timeout for fetch time
  checkUser() {
    setTimeout(() => {
      const current_password = (
        document.getElementById('password') as HTMLInputElement
      ).value;
      if (this.match_user) {
        if (this.match_user.password === current_password) {
          this.verify = true;
          console.log(this.verify, 'correct');
          var token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
          this.AuthService.setToken(token);
        } else {
          console.log('Wrong password');
        }
      } else {
        console.log('User not found');
      }
    }, 2000);
  }
 //noti login success
  sucess_login() {
    setTimeout(() => {
      if (!this.submitAttempt) {
        if (this.verify) {
          this.isModalOpen = true;
          setTimeout(() => {
            window.location.assign('home');
          }, 2000);
        } else {
          alert(document.cookie);
        }
      }
    }, 2500);
  }
//login
  async login() {
    await this.check();
    if (!this.submitAttempt) {
      this.sucess_login();
      this.renderUser();
      this.checkUser();
    } else {
      console.log('Form is not valid');
    }
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
}
