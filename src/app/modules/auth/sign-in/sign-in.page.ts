import { SelectorMatcher, Type } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import { LoadingController } from '@ionic/angular';

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
    private loadingController: LoadingController ,
    private userService: UserService
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

  // Select user in api 
  renderUser() {
    var current_username = (
      document.getElementById('username') as HTMLInputElement
    ).value;
    this.userService.getUsers().subscribe(
      (res: User[]) => {
        this.usersData = res;
        this.match_user = this.usersData.find(
          (user: any) => user.username === current_username
        );
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }

  //check pwd of user, timeout for fetch time 
  checkUser() {
    setTimeout(() => {
      var current_password = (
        document.getElementById('password') as HTMLInputElement
      ).value;
      if (this.match_user) {
        if (this.match_user.password === current_password) {
          this.verify = true;
          console.log(this.verify, 'correct');
        } else {
          console.log('Wrong password');
        }
      } else {
        console.log('wrong', this.match_user);
      }
    }, 2000);
  }

  //check button click without fill
  async check() {
    if (!this.slideOneForm.valid) {
      this.submitAttempt = true;
    } else {
      this.submitAttempt = false;
      const loading = await this.loadingController.create({
        message: 'Checking...',
        duration: 2500
      });
      await loading.present();
      
    }
  }

  //noti login success
  sucess_login() {
    setTimeout(() => {
      if (!this.submitAttempt) {
        if (this.verify) {
          this.isModalOpen = true;
          setTimeout(() => {
            window.location.assign('./');
          }, 2000);
        } else {
          alert(this.verify);
        }
      }
    }, 2500);
  }

  
  async login() {
    
    this.check();
    this.sucess_login();
    this.renderUser();
    this.checkUser();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
}
