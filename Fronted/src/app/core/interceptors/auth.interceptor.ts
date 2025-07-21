// src/app/core/interceptors/auth.interceptor.ts
import { Injectable }             from '@angular/core';
import { HttpInterceptor,
         HttpHandler,
         HttpRequest,
         HttpEvent }              from '@angular/common/http';
import { Observable }             from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    // ⇢ no hay token ⇒ sigue normal
    if (!token) {
      return next.handle(req);
    }

    // ⇢ no añadimos el token al propio login
    if (req.url.endsWith('/auth/login')) {
      return next.handle(req);
    }

    // ⇢ clonamos y agregamos cabecera Authorization
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });

    return next.handle(authReq);
  }
}