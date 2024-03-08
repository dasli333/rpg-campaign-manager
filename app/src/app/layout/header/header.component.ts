import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTabsModule} from '@angular/material/tabs'
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LoginService} from "../../modules/login/services/login.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIcon, MatIconButton, MatTabsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  isLoggedIn: Signal<boolean>
  #loginService = inject(LoginService);

  constructor() {
    this.isLoggedIn = this.#loginService.isUserLoggedIn
  }

  login() {
    this.#loginService.login()
  }

  logout() {
    this.#loginService.logout()
  }
}
