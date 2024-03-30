import {computed, inject, Injectable} from '@angular/core';
import {CampaignsService} from "../campaigns/campaigns.service";

@Injectable({
  providedIn: 'root'
})
export class StoryLogService {

  #campaignService = inject(CampaignsService);

  storyLog = computed(() => this.#campaignService.activeCampaign()?.storyLogs || []);

  constructor() { }

  // addStoryLog(entry: string) {
  //   // this.#campaignService.activeCampaign().storyLogs.push(entry);
  // }

}
