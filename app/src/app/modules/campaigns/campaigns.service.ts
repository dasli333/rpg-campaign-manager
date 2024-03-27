import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../http/http.service";
import {Observable} from "rxjs";
import {ICampaign} from "./interfaces/campaign";

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  #apiUrl = 'http://localhost:3000/campaigns';
  #http = inject(HttpService);
  #router = inject(Router);

  #activeCampaign: WritableSignal<ICampaign | undefined> = signal(undefined);
  activeCampaign = this.#activeCampaign.asReadonly();

  #campaigns: WritableSignal<ICampaign[]> = signal([]) ;

  campaigns = this.#campaigns.asReadonly();

  setActiveCampaign(id: string): void {
    this.#activeCampaign.set(this.getCampaignById(id));
    this.#router.navigate(['/dashboard']);
  }

  // createCampaign(campaign: Campaign): void {
  //   this.#campaigns.update(campaigns => [...campaigns, campaign]);
  //   this.setActiveCampaign(campaign.id);
  //   this.#router.navigate(['/dashboard']);
  // }

  setCampaigns(campaigns: ICampaign[]): void {
    this.#campaigns.set(campaigns);
  }

  createCampaign(campaign: ICampaign): Observable<any> {
    return this.#http.post(this.#apiUrl, campaign);
  }

  getCampaigns(): Observable<ICampaign[]> {
    return this.#http.get<ICampaign[]>(this.#apiUrl);
  }

  getCampaignById(id: string | null): ICampaign | undefined {
    return this.#campaigns().find(c => c.id === id);
  }

  editCampaign(campaign: ICampaign): void {
    this.#campaigns.update(campaigns => campaigns.map(c => c.id === campaign.id ? campaign : c));
    this.#router.navigate(['/campaigns']);
  }

  deleteCampaign(id: string): void {
    this.#campaigns.update(campaigns => campaigns.filter(c => c.id !== id));
  }
}
