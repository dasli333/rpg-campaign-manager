import {Injectable, Signal, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isUserLoggedIn = signal(false)

  constructor() { }

  login() {
    this.isUserLoggedIn.set(true)
  }

  logout() {
    this.isUserLoggedIn.set(false)
  }
  isLoggedIn(): Signal<boolean> {
    return this.isUserLoggedIn
  }
}
