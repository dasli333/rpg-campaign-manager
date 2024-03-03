import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ContentComponent} from "./layout/content/content.component";
import {HeaderComponent} from "./layout/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContentComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
}
