import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CampaignSelectorComponent} from "./campaign-selector/campaign-selector.component";
import {CampaignTreeComponent} from "./campaign-tree/campaign-tree.component";
import {CampaignsService} from "../campaigns/campaigns.service";

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

  #campaignsService = inject(CampaignsService);
  activeCampaign = this.#campaignsService.activeCampaign;
}
