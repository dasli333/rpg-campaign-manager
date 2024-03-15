import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Campaign} from "./interfaces/campaign";
import {GameSystem} from "./enums/game-system";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  #router = inject(Router);
  #activeCampaignId: WritableSignal<string> = signal('')
  activeCampaignId = this.#activeCampaignId.asReadonly();

  private campaigns: Campaign[] = [
    {id: '1', title: 'Campaign 1', description: 'This is campaign 1', startDate: new Date(), gameSystem: GameSystem.DungeonsDragons, image: '/assets/images/baldurs_gate.webp'},
    {id: '2', title: 'Campaign 2', description: 'This is campaign 2', startDate: new Date(), gameSystem: GameSystem.WarhammerFantasy, image: '/assets/images/warhammer_fantasy.webp'},
    {id: '3', title: 'Campaign 3', description: 'This is campaign 3', startDate: new Date(), gameSystem: GameSystem.DungeonsDragons},
  ];

  getCampaigns(): Campaign[] {
    return this.campaigns;
  }

  setActiveCampaignId(id: string): void {
    this.#activeCampaignId.set(id);
  }

  createCampaign(campaign: Campaign): void {
    this.campaigns.push(campaign);
    this.#activeCampaignId.set(campaign.id);
    this.#router.navigate(['/dashboard']);
  }
}
