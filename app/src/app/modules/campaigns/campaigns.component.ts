import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {Campaign} from "./interfaces/campaign";
import {MatCardModule} from '@angular/material/card';
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {CampaignsService} from "./campaigns.service";
import {DeleteCampaignDialogComponent} from "./delete-campaign-dialog/delete-campaign-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatDivider} from "@angular/material/divider";
import {EllipsisDirective} from "../helpers/ellipsis.directive";

@Component({
  selector: 'app-campaigns',
  standalone: true,
  imports: [MatCardModule, MatButton, RouterLink, NgOptimizedImage, MatDivider, EllipsisDirective],
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsComponent {

  #router = inject(Router);
  #campaignsService = inject(CampaignsService);
  #dialog = inject(MatDialog);

  defaultCampaignImage: string = '/assets/images/default_campaign.webp';

  // TODO: it should be observable when we have a backend
  campaigns: Signal<Campaign[]> = this.#campaignsService.campaigns

  constructor() {
  }

  selectCampaign(id: string) {
    this.#campaignsService.setActiveCampaignId(id);
    this.#router.navigate(['dashboard']);
  }

  editCampaign(id: string) {
    // TODO: implement edit campaign
    this.#router.navigate(['edit-campaign', id]);
  }

  deleteCampaign(id: string) {
    const dialogRef = this.#dialog.open(DeleteCampaignDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.#campaignsService.deleteCampaign(id);
      }
    });
  }
}
