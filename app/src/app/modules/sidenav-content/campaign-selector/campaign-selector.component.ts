import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {CampaignsService} from "../../campaigns/campaigns.service";
import {Campaign} from "../../campaigns/interfaces/campaign";
import {MatCardModule} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";
import {DEFAULT_CAMPAIGN_IMAGE} from "../../campaigns/campaigns.component";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-campaign-selector',
  standalone: true,
  imports: [MatCardModule, NgOptimizedImage, MatSelectModule, MatFormFieldModule],
  templateUrl: './campaign-selector.component.html',
  styleUrl: './campaign-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignSelectorComponent {

  #campaignService = inject(CampaignsService);

  activeCampaign: Signal<Campaign | undefined> = this.#campaignService.activeCampaign;
  campaigns: Signal<Campaign[]> = this.#campaignService.campaigns;

  onSelectCampaign(id: string) {
    this.#campaignService.setActiveCampaign(id);
  }


  protected readonly DEFAULT_CAMPAIGN_IMAGE = DEFAULT_CAMPAIGN_IMAGE;
}
