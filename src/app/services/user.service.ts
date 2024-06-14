import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { RelationshopHttpClient } from './header-request.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://666c01a849dbc5d7145c2bde.mockapi.io/api/v1/user';

  constructor(private http: RelationshopHttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
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
      address: dataSignUp.address,
      gender: '...',
      name: dataSignUp.fullname,
    };
    return this.http.post(`${this.apiUrl}`, requestPost);
  }
}