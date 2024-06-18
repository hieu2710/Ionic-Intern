import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private  authservice : AuthService
  ){}
  
 intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authservice.tokenFake; // use get token instead
    if (authToken) {
      // Clone the request and attach the token
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(authReq);
    }
    // If there is no token, pass the original request
    return next.handle(request);
  }
}