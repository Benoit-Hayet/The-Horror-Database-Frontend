import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const csrfToken = authService.getCsrfToken();
  const token = authService.getToken();

  let headers: any = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (csrfToken) {
    headers['X-XSRF-TOKEN'] = csrfToken;
  }

  const cloned = req.clone({ setHeaders: headers });
  return next(cloned);
};
