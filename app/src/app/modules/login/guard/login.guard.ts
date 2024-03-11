import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthService).isUserLoggedIn()) {
    return true;
  } else {
    inject(Router).navigate(['/campaigns']);
    return false;
  }
};
