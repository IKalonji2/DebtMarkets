import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { jwtDecode } from 'jwt-decode';

export const roleGuard = (expectedRole: string) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);


    const token = authService.getToken();

    if (!token) {
      console.error('No token found, redirecting to login.');
      router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken = jwtDecode(token) as any;

      const userRole = decodedToken?.role;

      if (userRole === expectedRole) {
        return true;
      }

      console.warn('Role mismatch. Redirecting to home.');
      router.navigate(['/']);
      return false;
    } catch (error) {
      console.error('Error decoding token in Guard:', error);
      router.navigate(['/login']);
      return false;
    }
  };
};
