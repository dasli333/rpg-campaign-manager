import {inject, Injectable} from '@angular/core';
import {Race, RaceReference, Subrace} from "./models/race";
import {HttpClient} from "@angular/common/http";
import {Apollo} from "apollo-angular";
import {gql} from "@apollo/client";
import {Trait} from "./models/trait";
import {CharacterClass, CharacterClassReference} from "./models/character-class";
import {Observable, shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Dnd5eApiService {

  #apiUrl = 'https://www.dnd5eapi.co';
  #http = inject(HttpClient);
  #apollo = inject(Apollo);

  #classDetailsCache: { [index: string]: Observable<CharacterClass> } = {};

  constructor() {
  }

  getRaces() {
    return this.#apollo.query<{ races: RaceReference[] }>({
      query: gql`
      query {
        races {
          index
          name
        }
      }
    `
    });
  }

  getRaceDetails(index: string) {
    return this.#apollo.query<{race: Race}>({
      query: gql`
        query {
          race(index: "${index}") {
            index
            name
            alignment
            age
            ability_bonuses {
              ability_score {
                index
                name
              }
              bonus
            }
            ability_bonus_options {
              choose
              from {
                options {
                  ability_score {
                    index
                    name
                  }
                  bonus
                }
              }
            }
            traits {
              index
              name
            }
            subraces {
              index
              name
              desc
              ability_bonuses {
                ability_score {
                  index
                  name
                }
                bonus
              }
              racial_traits {
                index
                name
              }
            }
          }
        }
      `
    });
  }

  getSubraceDetails(index: string) {
    return this.#apollo.query<{ subrace: Subrace }>({
      query: gql`
    query {
      subrace(index: "${index}") {
        index
        name
        desc
        ability_bonuses {
          ability_score {
            index
            name
          }
          bonus
        }
        racial_traits {
          index
          name
        }
      }
    }
  `
    });
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

  getClasses() {
    return this.#apollo.query<{ classes: CharacterClassReference[] }>({
      query: gql`
        query {
          classes {
            index
            name
          }
        }
      `
    });
  }

  // getClassDetails(index: string) {
  //   return this.#apollo.query<{ class: CharacterClass }>({
  //     query: gql`
  //       query {
  //         class(index: "${index}") {
  //           index
  //           name
  //           hit_die
  //           proficiencies {
  //             index
  //             name
  //           }
  //           proficiency_choices {
  //             choose
  //             type
  //             from {
  //               option_set_type
  //               options {
  //                 option_type
  //                 item {
  //                   index
  //                   name
  //                 }
  //               }
  //             }
  //           }
  //           subclasses {
  //             index
  //             name
  //           }
  //           spellcasting {
  //             spellcasting_ability {
  //               name
  //             }
  //             info {
  //               name
  //               desc
  //             }
  //           }
  //         }
  //       }
  //     `
  //   });
  // }

  getClassDetails(index: string) {
    if (!this.#classDetailsCache[index]) {
      this.#classDetailsCache[index] = this.#http.get<CharacterClass>(`${this.#apiUrl}/api/classes/${index}`).pipe(
        shareReplay(1)
      );
    }
    return this.#classDetailsCache[index];
  }
}

