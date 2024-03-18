import {inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
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

  #campaigns: WritableSignal<Campaign[]> = signal([
    {id: '1', title: 'Campaign 1', description: 'This is campaign 1', startDate: new Date(), gameSystem: GameSystem.DungeonsDragons, image: '/assets/images/baldurs_gate.webp'},
    {id: '2', title: 'Campaign 2', description: 'This is campaign 2', startDate: new Date(), gameSystem: GameSystem.WarhammerFantasy, image: '/assets/images/warhammer_fantasy.webp'},
    {id: '3', title: 'Campaign 3', description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.\n' +
        '\nThe Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.\n' +
        '\nThe Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.\n' +
        '\n', startDate: new Date(), gameSystem: GameSystem.DungeonsDragons},
  ]) ;

  campaigns = this.#campaigns.asReadonly();

  setActiveCampaignId(id: string): void {
    this.#activeCampaignId.set(id);
  }

  createCampaign(campaign: Campaign): void {
    this.#campaigns.update(campaigns => [...campaigns, campaign]);
    this.#activeCampaignId.set(campaign.id);
    this.#router.navigate(['/dashboard']);
  }

  getCampaignById(id: string | null): Campaign | undefined {
    return this.#campaigns().find(c => c.id === id);
  }

  editCampaign(campaign: Campaign): void {
    this.#campaigns.update(campaigns => campaigns.map(c => c.id === campaign.id ? campaign : c));
    this.#router.navigate(['/campaigns']);
  }

  deleteCampaign(id: string): void {
    this.#campaigns.update(campaigns => campaigns.filter(c => c.id !== id));
  }
}
