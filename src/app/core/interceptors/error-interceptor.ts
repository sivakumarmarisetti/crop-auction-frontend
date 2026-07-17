import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';

import { NotificationService } from '../services/notification.service';
import { AuthService } from '../../features/auth/services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const notification = inject(NotificationService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case 400:
          notification.error(error.error?.message ?? 'Bad Request');
          break;

        case 401:
          notification.error('Session expired. Please login again.');
          authService.logout();
          router.navigate(['/login']);
          break;

        case 403:
          notification.error('Access denied.');
          router.navigate(['/login']);
          break;

        case 404:
          notification.error('Resource not found.');
          break;

        case 500:
          notification.error('Internal server error.');
          break;

        default:
          notification.error('Something went wrong.');

      }

      return throwError(() => error);

    })

  );

};