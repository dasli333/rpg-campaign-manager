import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {ICampaign} from "./interfaces/campaign";
import {MatCardModule} from '@angular/material/card';
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {CampaignsService} from "./campaigns.service";
import {DeleteCampaignDialogComponent} from "./delete-campaign-dialog/delete-campaign-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatDivider} from "@angular/material/divider";
import {EllipsisDirective} from "../helpers/ellipsis.directive";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {map} from "rxjs";
import {IMAGE_URL} from "../../../config";

export const DEFAULT_CAMPAIGN_IMAGE: string = '/assets/images/default_campaign.webp';

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


  campaigns: Signal<ICampaign[]> = this.#campaignsService.campaigns

  constructor() {
    this.#campaignsService.getCampaigns().pipe(
      takeUntilDestroyed(),
      map(campaigns => campaigns.map(campaign => {
        return {
          ...campaign
        }
      }))
    ).subscribe(campaigns => {
      this.#campaignsService.setCampaigns(campaigns);
    });
  }

  selectCampaign(id: string) {
    this.#campaignsService.setActiveCampaign(id).subscribe(() => {
      this.#router.navigate(['dashboard']);
    });
  }

  editCampaign(id: string) {
    this.#router.navigate(['edit-campaign', id]);
  }

  deleteCampaign(id: string) {
    const dialogRef = this.#dialog.open(DeleteCampaignDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.#campaignsService.deleteCampaign(id).subscribe(() => {
          this.#campaignsService.checkIfCampaignExists(id);
          this.#campaignsService.setCampaigns(this.#campaignsService.campaigns().filter(campaign => campaign.id !== id));
        });
      }
    });
  }

  protected readonly DEFAULT_CAMPAIGN_IMAGE = DEFAULT_CAMPAIGN_IMAGE;
  protected readonly IMAGE_URL = IMAGE_URL;
}
