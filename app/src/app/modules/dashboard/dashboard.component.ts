import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {CampaignsService} from "../campaigns/campaigns.service";
import {Campaign} from "../campaigns/interfaces/campaign";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

  #campaignsService = inject(CampaignsService);
  campaign: Signal<Campaign | undefined> = this.#campaignsService.activeCampaign;
}
