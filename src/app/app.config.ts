import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

import { jwtInterceptor } from './core/interceptors/jwt-interceptor';

import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {

  providers: [

  provideBrowserGlobalErrorListeners(),

  provideRouter(routes),

  provideAnimations(),

  importProvidersFrom(MatSnackBarModule),
  provideNativeDateAdapter(),

  provideHttpClient(
    withInterceptors([
    loadingInterceptor,
    jwtInterceptor,
    errorInterceptor
])
  )

]

};