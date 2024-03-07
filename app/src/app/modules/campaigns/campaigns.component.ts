import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {LoginService} from "../login/services/login.service";

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsComponent {

  isLoggedIn: Signal<boolean>
  #loginService = inject(LoginService);

  constructor() {
    this.isLoggedIn = this.#loginService.isLoggedIn()
  }
}
