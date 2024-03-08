import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../services/login.service";


export const authGuard: CanActivateFn = (route, state) => {
  if (inject(LoginService).isUserLoggedIn()) {
    return true
  } else {
    inject(Router).navigate(['/login']);
    return false
  }
};
