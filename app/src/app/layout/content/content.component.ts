import {ChangeDetectionStrategy, Component, inject, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";
import {SidenavContentComponent} from "../../modules/sidenav-content/sidenav-content.component";
import {AuthService} from "../../modules/login/services/auth.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {AsyncPipe} from "@angular/common";
import {map, shareReplay} from "rxjs";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet,
    SidenavContentComponent,
    AsyncPipe,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  #breakpointObserver = inject(BreakpointObserver);
  #authService = inject(AuthService);
  isUserLoggedIn = this.#authService.isUserLoggedIn;
  isHandset$ = this.#breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  toggleSidenav() {
    this.sidenav?.toggle();
  }
}
