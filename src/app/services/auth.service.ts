
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
private tokenFake = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  product: any;

  constructor(
    private http: HttpClient
  ) { 
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }


checkTokenRun() {
  const headers = { 
  'Authorization': `Bearer ${this.tokenFake}` ,
}
  this.http.get<any>(`${this.apiUrlMock}`, { headers })
      .subscribe(data => this.product = data);
}


  // login(email: string, password: string): Observable<any> {
  //   return new Observable(observer => {
  //     return this.http.get<any[]>(`${this.apiUrl}/users`).subscribe(users =>{
  //       const user = users.find(u => u.email === email &&  u.password === password)
  //       if(user) {
  //         observer.next({ token: this.tokenFake });
  //       }else {
  //         observer.error({ message: 'Invalid email or password' });
  //       }
  //       observer.complete();
  //     })
  //   })
  // }

  // receiveToken(token: string): Observable<any>{ 
  //   if (token === this.tokenFake){
  //     return this.http.get(`${this.apiUrl}/datas`)
  //   } else {
  //     return new Observable(observer => {
  //       observer.error({message: 'Forbidden'});
  //       observer.complete;
  //     })
  //   }

  // }

  login (username: string, password:string): Observable<any> {
    return new Observable(observer => {

      return this.http.get<any[]>(`${this.apiUrlMock}`).subscribe(user => {
        const userLogin = user.find( u => u.username === username && u.password === password)
        if(userLogin){
          observer.next({token: this.tokenFake})
        } else {
          observer.error({ message: 'Invalid email or password' });
        }
        observer.complete();
      }
      )
    })
  }


  receivedToken(token:string){
    if(token === this.tokenFake) {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tokenFake}`
      })
      return this.http.get(`${this.apiUrl}/datas`)
 
    } else {
      return new Observable(observer =>{
        observer.error({message: 'Forbidden'});
        observer.complete;
      })
    }
    
  }
  
}
