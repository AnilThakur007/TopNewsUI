import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Request Failed:', error);
      alert('Something went wrong! Please try again.');
      return throwError(() => new Error('Network error occurred.'));
    })
  );

