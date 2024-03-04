import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterOutlet
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {

}
