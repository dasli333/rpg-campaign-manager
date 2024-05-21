import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {CampaignsService} from "../campaigns/campaigns.service";
import {MatCardModule} from "@angular/material/card";
import {IMAGE_URL} from "../../../config";
import {NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-players-characters',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatCardModule,
    NgOptimizedImage,
    MatDivider
  ],
  templateUrl: './players-characters.component.html',
  styleUrl: './players-characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCharactersComponent {

  #campaignService = inject(CampaignsService);

  playersCharacters = this.#campaignService.playersCharacters;

  deletePlayerCharacter(id: string | undefined) {
    if (!id) return;
    this.#campaignService.deletePlayerCharacter(id);
  }

    protected readonly IMAGE_URL = IMAGE_URL;
}
