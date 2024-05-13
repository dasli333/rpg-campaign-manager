import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../../http/http.service";
import {catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {ICampaign} from "./interfaces/campaign";
import {StoryLog} from "../story-log/interface/story-log";

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  #apiUrl = 'campaigns';
  #httpService = inject(HttpService);
  #router = inject(Router);

  #activeCampaign: WritableSignal<ICampaign | undefined> = signal(undefined);
  activeCampaign = this.#activeCampaign.asReadonly();

  #campaigns: WritableSignal<ICampaign[]> = signal([]);

  campaigns = this.#campaigns.asReadonly();
  storyLogs = computed(() => this.activeCampaign()?.storyLogs || []);
  playersCharacters = computed(() => this.activeCampaign()?.playersCharacters || []);

  setActiveCampaign(id: string): Observable<ICampaign | undefined> {
    return this.getCampaignById(id).pipe(
      catchError(() => {
        // TODO: navigate to 404 page
        this.#router.navigate(['/campaigns']);
        return of(undefined);
      }),
      tap(campaign => {
        if (!campaign) return;
        this.#activeCampaign.set(campaign);
      })
    )
  }

  // createCampaign(campaign: Campaign): void {
  //   this.#campaigns.update(campaigns => [...campaigns, campaign]);
  //   this.setActiveCampaign(campaign.id);
  //   this.#router.navigate(['/dashboard']);
  // }

  setCampaigns(campaigns: ICampaign[]): void {
    this.#campaigns.set(campaigns);
  }

  addCampaign(campaign: ICampaign): void {
    this.#campaigns.update(campaigns => [...campaigns, campaign]);
  }


  createCampaign(campaign: FormData): Observable<ICampaign> {
    return this.#httpService.post<ICampaign>(this.#apiUrl, campaign);
  }

  getCampaigns(): Observable<ICampaign[]> {
    return this.#httpService.get<ICampaign[]>(this.#apiUrl);
  }

  getCampaignById(id: string | null): Observable<ICampaign | undefined> {
    return this.#httpService.get<ICampaign>(`${this.#apiUrl}/${id}`);
  }

  editCampaign(campaign: ICampaign): Observable<ICampaign> {
    return this.#httpService.patch<ICampaign>(`${this.#apiUrl}/${campaign.id}`, campaign);
  }

  deleteCampaign(id: string): Observable<ICampaign> {
    return this.#httpService.delete<ICampaign>(`${this.#apiUrl}/${id}`);
  }

  checkIfCampaignExists(id: string): void {
    if (this.#activeCampaign()?.id === id) {
      this.#activeCampaign.set(undefined);
    }
  }

  addStoryLog(storyLog: StoryLog): Observable<ICampaign | undefined> {
    return this.#httpService.post<ICampaign>(`${this.#apiUrl}/${this.activeCampaign()?.id}/story-log`, storyLog).pipe(
      tap(campaign => {
        this.#activeCampaign.set(campaign);
      })
    );
  }

  updateStoryLog(storyLog: StoryLog): Observable<ICampaign | undefined> {
    return this.#httpService.patch<ICampaign>(`${this.#apiUrl}/${this.activeCampaign()?.id}/story-log/${storyLog._id}`, storyLog).pipe(
      tap(campaign => {
        this.#activeCampaign.set(campaign);
      })
    );
  }

  deleteStoryLog(storyLogId: string): Observable<ICampaign | undefined> {
    return this.#httpService.delete<ICampaign>(`${this.#apiUrl}/${this.activeCampaign()?.id}/story-log/${storyLogId}`).pipe(
      tap(campaign => {
        this.#activeCampaign.set(campaign);
      })
    );
  }

  deletePlayerCharacter(id: string): void {
    this.#activeCampaign.update(campaign => {
      if (!campaign) return;
      campaign.playersCharacters = campaign.playersCharacters.filter(playerCharacter => playerCharacter._id !== id);
      return campaign;
    });
  }

  addPlayerCharacter(playerCharacter: any): Observable<ICampaign | undefined> {
    return this.#httpService.post<ICampaign>(`${this.#apiUrl}/${this.activeCampaign()?.id}/player-character`, playerCharacter).pipe(
      // switchMap(campaign => {
      //   return this.setActiveCampaign(campaign.id);
      // })
    );
  }
}
