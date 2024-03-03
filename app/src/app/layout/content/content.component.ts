import {Component} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    MatSidenavModule
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

}
