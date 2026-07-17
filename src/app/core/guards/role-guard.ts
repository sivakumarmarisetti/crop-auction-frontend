import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../../features/auth/services/auth.service';
import { APP_ROUTES } from '../constants/app-routes';
import { Role } from '../../features/auth/models/role.model';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree([APP_ROUTES.LOGIN]);
  }

  const expectedRole = route.data['role'] as Role;

  if (authService.hasRole(expectedRole)) {
    return true;
  }

  return router.createUrlTree([APP_ROUTES.LOGIN]);

};