import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private router: Router
    
  ) {}

  ngOnInit() {
    this.checkLoggedin();
  }

  getCookieValue() {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName == 'tokenFake') {
        return cookieValue;
      }
    }
    return null;
  }

  //get token ở cookie if còn exspired thì navigate to home page, else thì navigate to login
  checkLoggedin() {
    if (this.getCookieValue() === this.userService.tokenFake) {
      this.router.navigate(['/home'])
      return true;
    } else {
      this.router.navigate(['/sign-in'])
      return false;
    }
  }
}
