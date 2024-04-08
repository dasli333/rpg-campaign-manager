import {inject, Injectable} from '@angular/core';
import {Race, RaceReference} from "./models/race";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Dnd5eApiService {

  #apiUrl = 'https://www.dnd5eapi.co';
  #http = inject(HttpClient);
  constructor() { }

  getRaces() {
    return this.#http.get<{results: RaceReference[]}>(this.#apiUrl + '/api/races');
  }

  getRaceDetails<T>(url: string) {
    return this.#http.get<T>(this.#apiUrl + url);
  }
}
