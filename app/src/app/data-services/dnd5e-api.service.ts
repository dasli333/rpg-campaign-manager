import {inject, Injectable} from '@angular/core';
import {Race, RaceReference} from "./models/race";
import {HttpClient} from "@angular/common/http";
import {Apollo} from "apollo-angular";
import {gql} from "@apollo/client";
import {Trait} from "./models/trait";

@Injectable({
  providedIn: 'root'
})
export class Dnd5eApiService {

  #apiUrl = 'https://www.dnd5eapi.co';
  #http = inject(HttpClient);
  #apollo = inject(Apollo);
  constructor() { }

  getRaces() {
    return this.#http.get<{results: RaceReference[]}>(this.#apiUrl + '/api/races');
  }

  getRaceDetails<T>(url: string) {
    return this.#http.get<T>(this.#apiUrl + url);
  }

  getTraits() {
    return this.#apollo.query<{ traits: Trait[] }>({
      query: gql`
        query {
          traits {
            index
            desc
          }
        }
      `
    });
  }
}

