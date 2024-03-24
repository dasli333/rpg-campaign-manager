import {Routes} from '@angular/router';
import {CampaignsComponent} from "./modules/campaigns/campaigns.component";
import {LoginComponent} from "./modules/login/login.component";
import {authGuard} from "./modules/login/guard/auth.guard";
import {loginGuard} from "./modules/login/guard/login.guard";
import {CreateCampaignComponent} from "./modules/campaigns/create-campaign/create-campaign.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {StoryLogComponent} from "./modules/story-log/story-log.component";
import {PlayersCharactersComponent} from "./modules/players-characters/players-characters.component";

export const routes: Routes = [
  {path: '', redirectTo: '/campaigns', pathMatch: 'full'},
  {path: '', canActivateChild: [authGuard], children: [
      {path: 'campaigns', component: CampaignsComponent},
      {path: 'edit-campaign/:id', component: CreateCampaignComponent},
      {path: 'create-campaign', component: CreateCampaignComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'story-log', component: StoryLogComponent},
      {path: 'players', component: PlayersCharactersComponent},
    ]
  },
  {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
  {path: '**', redirectTo: '/login'}
];
