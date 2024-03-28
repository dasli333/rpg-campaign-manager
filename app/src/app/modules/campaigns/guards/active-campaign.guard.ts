import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CampaignsService} from "../campaigns.service";

export const activeCampaignGuard: CanActivateFn = (route, state) => {
  if (!inject(CampaignsService).activeCampaign()) {
    inject(Router).navigate(['/campaigns']);
    return false;
  }
  return true;
};
