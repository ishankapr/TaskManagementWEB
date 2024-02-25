import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  // Use dependency injection to get an instance of the AuthService
  const authService =  inject(AuthService);

  // Check if the user is logged in using the AuthService
  if (authService.IsLoggedIn()) {
    return true; // If logged in, allow access to the route
  } else {
    return inject(Router).createUrlTree(['/login']); // If not logged in, deny access to the route
  }
};
