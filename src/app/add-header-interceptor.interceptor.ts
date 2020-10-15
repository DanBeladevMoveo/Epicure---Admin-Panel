import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clone the request to add the new header
    const token = localStorage.getItem('token');
    const clonedRequest = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest).toPromise()
    .catch(err => {
      // onError
      console.log(err);
      if (err instanceof HttpErrorResponse) {
          console.log(err.status);
          console.log(err.statusText);
          if (err.status === 401) {
            localStorage.removeItem('login');
            localStorage.removeItem('token');
              window.location.href = "/login";
          }
      }
      return Observable.throw(err);
  }) as any;
  }
}
