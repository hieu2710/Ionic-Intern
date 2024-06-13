import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:3000"
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`)
  }

  postUsers(dataSignUp: any): Observable<any> {
    const requestPost ={
      username: dataSignUp.username,
      email: dataSignUp.email,
      password: dataSignUp.password,
      address: dataSignUp.address,
      gender: "...",
      name: dataSignUp.fullname
    };
    return this.http.post(`${this.apiUrl}/users`, requestPost)
  }
}
