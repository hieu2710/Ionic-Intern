import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { RelationshopHttpClient } from './header-request.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = "http://localhost:3000"
  private apiUrlMock = "https://666c06cf49dbc5d7145c4413.mockapi.io/api/users/users"
  public tokenFake = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    const headers = { 
      'Authorization': `Bearer ${this.tokenFake}` ,
    }
    return this.http.get(`${this.apiUrl}/users`);
  }

  login(username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { username });
  }
  ReadUsers(){
    this.http.get<any>(`${this.apiUrl}`)
  }
  postUsers(dataSignUp: any): Observable<any> {
    const requestPost = {
      username: dataSignUp.username,
      email: dataSignUp.email,
      password: dataSignUp.password,
      phone: dataSignUp.phone,
      address: dataSignUp.address,
      name: dataSignUp.fullname
    };
    document.cookie = `tokenFake=${this.tokenFake}; max-age=300; path=/;`;
    
    return this.http.post(`${this.apiUrlMock}`,requestPost)
  }
}