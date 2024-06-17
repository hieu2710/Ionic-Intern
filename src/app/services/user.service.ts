import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://666c01a849dbc5d7145c2bde.mockapi.io/api/v1/user';
  private apiUrlMock = "https://666c06cf49dbc5d7145c4413.mockapi.io/api/users/users"
  public tokenFake = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    
  }

public messageExistedEmail: string | undefined;
public messageExistedUserName: string | undefined;
  getUser(username: string, email: string): Observable<{emailExists: boolean, usernameExists: boolean}> {
    const headers = { 
      'Authorization': `Bearer ${this.tokenFake}` ,
    }
    return new Observable(observer => { 
      return this.http.get<any[]>(`${this.apiUrlMock}`).subscribe(usedName => {
        const usernameExists = usedName.find(u => u.username === username)
        const emailExists = usedName.find(e => e.email === email)
        observer.next({usernameExists,emailExists})
        observer.complete()
      }, error => {
        observer.error(error)
      }
    )
    })
  }

  postUsers(getInforUser: any): Observable<any> {
    const requestPost = {
      username: getInforUser.username,
      email: getInforUser.email,
      password: getInforUser.password,
      phone: getInforUser.phone,
      address: getInforUser.address,
      name: getInforUser.fullname
    };
    document.cookie = `tokenFake=${this.tokenFake}; max-age=300; path=/;`;
    
    return this.http.post(`${this.apiUrlMock}`,requestPost)

  }
}