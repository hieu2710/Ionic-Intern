import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {
  email: any;
  password: any;
  username: any;
  token: string | null = null;
  protectedData: any;

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  check(){
    this.authService.checkTokenRun()
  }

  login() {
     this.authService.login(this.username, this.password).subscribe(
      (res) => {
        this.token = res.token;
        document.cookie = `tokenFake=${this.token}max-age=84000`;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  receivedToken() {
    if (this.token) {
       this.authService.receivedToken(this.token).subscribe(
        (res) => {
          this.protectedData = res;
        },
        (error) => {
          console.error('Failed to get protected data', error);
        }
      );
    } else if (!this.token) {
      alert("Login please!")
    }
    else {
      console.error('No token available');
    }
  }

}
