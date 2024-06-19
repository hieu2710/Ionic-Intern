
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {
private apiUrl = "http://localhost:3000"
private tokenKey = 'authToken';
private apiUrlMock = "https://666c06cf49dbc5d7145c4413.mockapi.io/api/users/users"
public tokenFake = '';
  product: any;

  constructor(
    private http: HttpClient
  ) { 
  }


  setToken(token:string ): void {
    document.cookie = `tokenFake=${token}; max-age=300; path=/;`;
    this.tokenFake = token;
  }  
  getTokenFromCookie(): string | null {
    const match = document.cookie.match(new RegExp('(^| )tokenFake=([^;]+)'));
    return match ? match[2] : null;
  }

}
