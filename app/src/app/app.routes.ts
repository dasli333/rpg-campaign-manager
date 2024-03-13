import {Routes} from '@angular/router';
import {CampaignsComponent} from "./modules/campaigns/campaigns.component";
import {LoginComponent} from "./modules/login/login.component";
import {authGuard} from "./modules/login/guard/auth.guard";
import {loginGuard} from "./modules/login/guard/login.guard";
import {CreateCampaignComponent} from "./modules/campaigns/create-campaign/create-campaign.component";

export const routes: Routes = [
  {path: '', redirectTo: '/campaigns', pathMatch: 'full'},
  {path: '', canActivateChild: [authGuard], children: [
      {path: 'campaigns', component: CampaignsComponent},
      {path: 'create-campaign', component: CreateCampaignComponent},
    ]
  },
  {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
  {path: '**', redirectTo: '/login'}
];
