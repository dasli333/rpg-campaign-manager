import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Campaign} from "./interfaces/campaign";
import {GameSystem} from "./enums/game-system";
import {MatCardModule} from '@angular/material/card';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [MatCardModule, MatButton, RouterLink, NgOptimizedImage],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsComponent {

  defaultCampaignImage: string = '/assets/images/default_campaign.webp';

  campaigns: Campaign[] = [
    {id: 1, title: 'Campaign 1', description: 'This is campaign 1', startDate: new Date(), gameSystem: GameSystem.DungeonsDragons, image: '/assets/images/baldurs_gate.webp'},
    {id: 2, title: 'Campaign 2', description: 'This is campaign 2', startDate: new Date(), gameSystem: GameSystem.WarhammerFantasy, image: '/assets/images/warhammer_fantasy.webp'},
    {id: 3, title: 'Campaign 3', description: 'This is campaign 3', startDate: new Date(), gameSystem: GameSystem.DungeonsDragons},
  ];

  constructor() {
  }
}
