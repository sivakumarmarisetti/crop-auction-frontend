import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../../features/auth/services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const token = authService.getToken();

  // Skip authentication endpoints
  if (
    req.url.includes('/api/auth/login') ||
    req.url.includes('/api/auth/register')
  ) {
    return next(req);
  }

  if (token) {

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

  }

  return next(req);

};