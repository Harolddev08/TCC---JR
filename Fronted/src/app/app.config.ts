import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withInterceptorsFromDi          // 👈 esto
} from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes }          from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    /* ——— HttpClient + interceptores de DI ——— */
    provideHttpClient(
      withInterceptorsFromDi()      // 👈 aquí
    ),

    /* ——— Registramos la CLASE interceptor en el injector ——— */
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    provideRouter(routes)
  ]
};