import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../profile/services/auth/auth.service';
import { ModalResultService } from '../helpers/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalResultService: ModalResultService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request: HttpRequest<any> = req;
    const token: string = this.authService.getAccessToken();

    if (token &&
      !this.router.url.includes('login') &&
      !this.router.url.includes('refresh-token')) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`,
          Accept: 'application/json'
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401 && this.router.url.includes('login')) {
          this.modalResultService.unsuccessfulLogin();
        } else if (err.status === 401) {
          this.router.navigate(['profile/login']).then(() => {
            if (this.authService.isLogged()) {
              this.authService.logout();
            }
          });
        }
        return throwError(err);
      })
    );
  }
}
