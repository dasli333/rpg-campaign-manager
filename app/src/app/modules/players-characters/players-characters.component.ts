import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {CampaignsService} from "../campaigns/campaigns.service";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-players-characters',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatCardModule
  ],
  templateUrl: './players-characters.component.html',
  styleUrl: './players-characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersCharactersComponent {

  #campaignService = inject(CampaignsService);

  playersCharacters = this.#campaignService.playersCharacters;

  deletePlayerCharacter(id: string) {
    this.#campaignService.deletePlayerCharacter(id);
  }

}
