import { HttpClient, HttpContext, HttpHandler, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RelationshopHttpClient extends HttpClient {
  constructor(
    handler: HttpHandler,
    private authService: AuthService
  ) {
    super(handler);
  }

  apiUrl = "https://666c01a849dbc5d7145c2bde.mockapi.io/api/v1/user";

  override request(
    first: string | HttpRequest<any>,
    url?: string,
    options: {
      body?: any;
      headers?: HttpHeaders | { [header: string]: string | string[] };
      context?: HttpContext;
      observe?: 'body' | 'events' | 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
          };
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    } = {}
  ): Observable<any> {
    // Ensure the correct URL is used
    if (typeof first === 'string') {
      url = this.apiUrl 
    } else {
      url = this.apiUrl
    }

    // Token
    let headers = options.headers instanceof HttpHeaders
      ? options.headers
      : new HttpHeaders(options.headers);

    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const token = this.authService.getToken()
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    options.headers = headers;

    return super.request(first as any, url, options);
  }
}
