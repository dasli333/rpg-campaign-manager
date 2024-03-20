import { ChangeDetectionStrategy, Component } from '@angular/core';
import {CampaignSelectorComponent} from "./campaign-selector/campaign-selector.component";
import {CampaignTreeComponent} from "./campaign-tree/campaign-tree.component";

@Component({
  selector: 'app-sidenav-content',
  standalone: true,
  imports: [
    CampaignSelectorComponent,
    CampaignTreeComponent
  ],
  templateUrl: './sidenav-content.component.html',
  styleUrl: './sidenav-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavContentComponent {

}
