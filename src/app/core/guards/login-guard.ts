import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../../features/auth/services/auth.service';
import { APP_ROUTES } from '../constants/app-routes';
import { Role } from '../../features/auth/models/role.model';

export const loginGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser();

  if (!user) {
    return true;
  }

  switch (user.role) {

    case Role.ADMIN:
      return router.createUrlTree([APP_ROUTES.ADMIN.DASHBOARD]);

    case Role.FARMER:
      return router.createUrlTree([APP_ROUTES.FARMER.DASHBOARD]);

    case Role.BUYER:
      return router.createUrlTree([APP_ROUTES.BUYER.DASHBOARD]);

    default:
      return true;

  }

};