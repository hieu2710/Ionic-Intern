import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAuthenticated: boolean = false;

  constructor(
    private router:Router,
  ) {}


  logout(){
    document.cookie = `tokenFake=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.router.navigate(['/sign-in'])
  }
}
