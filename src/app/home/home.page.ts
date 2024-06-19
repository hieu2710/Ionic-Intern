import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAuthenticated: boolean = false;

  constructor(
    private router:Router,
    private userService: UserService) {

  }


  logout(){
    document.cookie = `tokenFake=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.router.navigate(['/sign-in'])
  }
 
  renderUser() {
    this.userService.getUsers().subscribe(
      data => {
        console.log('User data:', data);
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
