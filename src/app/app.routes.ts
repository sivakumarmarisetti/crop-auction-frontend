import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';

import { DashboardLayout } from './core/layout/dashboard-layout/dashboard-layout';

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { loginGuard } from './core/guards/login-guard';

import { Role } from './features/auth/models/role.model';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard]
  },

  {
  path: 'farmer-register',
  loadComponent: () =>
    import('./features/auth/farmer-register/farmer-register')
      .then(m => m.FarmerRegister)
},

{
  path: 'buyer-register',
  loadComponent: () =>
    import('./features/auth/buyer-register/buyer-register')
      .then(m => m.BuyerRegister)
},

  {
  path: 'register/farmer',
  loadComponent: () =>
    import('./features/auth/farmer-register/farmer-register')
      .then(m => m.FarmerRegister)
},

{
  path: 'register/buyer',
  loadComponent: () =>
    import('./features/auth/buyer-register/buyer-register')
      .then(m => m.BuyerRegister)
},

  // ======================================================
  // ADMIN
  // ======================================================

  {
    path: 'admin',
    component: DashboardLayout,
    canActivate: [
      authGuard,
      roleGuard
    ],
    data: {
      role: Role.ADMIN
    },
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'pending-users',
        loadComponent: () =>
          import('./features/admin/pending-users/pending-users')
            .then(m => m.PendingUsers)
      },

      {
        path: 'pending-auction-requests',
        loadComponent: () =>
          import('./features/admin/pending-auction-requests/pending-auction-requests')
            .then(m => m.PendingAuctionRequests)
      },

      {
        path: 'auctions',
        loadComponent: () =>
          import('./features/admin/auctions/auctions')
            .then(m => m.Auctions)
      },
      {
  path: 'create-auction',
  loadComponent: () =>
    import('./features/auction/create-auction/create-auction')
      .then(m => m.CreateAuction)
},

{
  path: 'auction-list',
  loadComponent: () =>
    import('./features/auction/auction-list/auction-list')
      .then(m => m.AuctionList)
}

    ]
  },

  // ======================================================
  // FARMER
  // ======================================================

  {
    path: 'farmer',
    component: DashboardLayout,
    canActivate: [
      authGuard,
      roleGuard
    ],
    data: {
      role: Role.FARMER
    },
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/farmer/dashboard/dashboard')
            .then(m => m.DashboardComponent)
      },

      {
        path: 'add-crop',
        loadComponent: () =>
          import('./features/farmer/add-crop/add-crop')
            .then(m => m.AddCrop)
      },

      {
        path: 'my-crops',
        loadComponent: () =>
          import('./features/farmer/my-crops/my-crops')
            .then(m => m.MyCrops)
      },

      {
        path: 'my-auction-requests',
        loadComponent: () =>
          import('./features/farmer/my-auction-requests/my-auction-requests')
            .then(m => m.MyAuctionRequests)
      },
      {
  path: 'request-auction',
  loadComponent: () =>
    import('./features/farmer/request-auction/request-auction')
      .then(m => m.RequestAuction)
}

    ]
  },

  // ======================================================
  // BUYER
  // ======================================================

  {
    path: 'buyer',
    component: DashboardLayout,
    canActivate: [
      authGuard,
      roleGuard
    ],
    data: {
      role: Role.BUYER
    },
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/buyer/dashboard/dashboard')
            .then(m => m.Dashboard)
      },

      {
        path: 'available-crops',
        loadComponent: () =>
          import('./features/buyer/available-crops/available-crops')
            .then(m => m.AvailableCrops)
      },
      {
  path: 'crop-details/:id',
  loadComponent: () =>
    import('./features/buyer/crop-details/crop-details')
      .then(m => m.CropDetails)
}

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];