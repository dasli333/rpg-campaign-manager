import {Routes} from '@angular/router';
import {CampaignsComponent} from "./modules/campaigns/campaigns.component";
import {LoginComponent} from "./modules/login/login.component";
import {authGuard} from "./modules/login/guard/auth.guard";

export const routes: Routes = [
  {path: '', redirectTo: '/campaigns', pathMatch: 'full'},
  {path: '', canActivateChild: [authGuard], children: [
      {path: 'campaigns', component: CampaignsComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/login'}
];
