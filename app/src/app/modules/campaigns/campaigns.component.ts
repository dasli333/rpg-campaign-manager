import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Campaign} from "./interfaces/campaign";
import {MatCardModule} from '@angular/material/card';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {CampaignsService} from "./campaigns.service";

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [MatCardModule, MatButton, RouterLink, NgOptimizedImage],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsComponent {

  #campaignsService = inject(CampaignsService);

  defaultCampaignImage: string = '/assets/images/default_campaign.webp';

  // TODO: it should be observable when we have a backend
  campaigns: Campaign[] = this.#campaignsService.getCampaigns()

  constructor() {
  }
}
