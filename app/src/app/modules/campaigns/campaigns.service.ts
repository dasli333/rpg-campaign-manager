import {Injectable} from '@angular/core';
import {Campaign} from "./interfaces/campaign";
import {GameSystem} from "./enums/game-system";

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  private campaigns: Campaign[] = [
    {id: '1', title: 'Campaign 1', description: 'This is campaign 1', startDate: new Date(), gameSystem: GameSystem.DungeonsDragons, image: '/assets/images/baldurs_gate.webp'},
    {id: '2', title: 'Campaign 2', description: 'This is campaign 2', startDate: new Date(), gameSystem: GameSystem.WarhammerFantasy, image: '/assets/images/warhammer_fantasy.webp'},
    {id: '3', title: 'Campaign 3', description: 'This is campaign 3', startDate: new Date(), gameSystem: GameSystem.DungeonsDragons},
  ];

  getCampaigns(): Campaign[] {
    return this.campaigns;
  }

  createCampaign(campaign: Campaign): void {
    this.campaigns.push(campaign);
  }
}
