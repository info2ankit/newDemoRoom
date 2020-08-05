import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {AlertService} from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public alertService:AlertService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Basic ' + environment.authentication
      }
    });
    return next.handle(tokenizedReq)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Exception in backend api `;
          }
          return throwError(errorMessage);
        })
      )

  }

}
