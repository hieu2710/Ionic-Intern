import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  checkToken() {
    const retrievedToken = this.authService.getToken();
    if (retrievedToken) {
      this.isAuthenticated = true;
      console.log('Token successfully set and retrieved:', retrievedToken);
    } else {
      this.isAuthenticated = false;
      console.log('Failed to retrieve the correct token');
          }
      }

}
