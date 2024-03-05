import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTabsModule} from '@angular/material/tabs'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIcon, MatIconButton, MatTabsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
