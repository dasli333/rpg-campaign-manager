import {inject, Injectable, signal} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #router = inject(Router);
  #isUserLoggedIn = signal(true);
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

  createUser(user: User) {
    console.log('User created', user);
    this.login();
  }

}
