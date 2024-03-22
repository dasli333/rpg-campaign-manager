import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";
import {SidenavContentComponent} from "../../modules/sidenav-content/sidenav-content.component";
import {AuthService} from "../../modules/login/services/auth.service";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    SidenavContentComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {

  #authService = inject(AuthService);
  isUserLoggedIn = this.#authService.isUserLoggedIn;
}
