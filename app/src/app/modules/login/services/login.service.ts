import {inject, Injectable, signal} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  #router = inject(Router);
  #isUserLoggedIn = signal(false);
  isUserLoggedIn = this.#isUserLoggedIn.asReadonly();

  constructor() { }

  login() {
    this.#isUserLoggedIn.set(true);
    this.#router.navigate(['/campaigns']);
  }

  logout() {
    this.#isUserLoggedIn.set(false)
    this.#router.navigate(['/login']);
  }

}
