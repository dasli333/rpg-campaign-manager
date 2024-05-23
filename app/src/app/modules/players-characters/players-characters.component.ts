import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {CampaignsService} from "../campaigns/campaigns.service";
import {MatCardModule} from "@angular/material/card";
import {IMAGE_URL} from "../../../config";
import {NgOptimizedImage} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeleteDialogComponent} from "../helpers/confirm-delete-dialog.component";

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
  #dialog = inject(MatDialog);

  playersCharacters = this.#campaignService.playersCharacters;

  deletePlayerCharacter(id: string | undefined) {
    if (!id) return;

    const dialogRef = this.#dialog.open(ConfirmDeleteDialogComponent, {
      width: '250px',
      data: {
        message: 'Are you sure you want to delete this player character?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.#campaignService.deletePlayerCharacter(id).subscribe();
      }
    });
  }

    protected readonly IMAGE_URL = IMAGE_URL;
}
