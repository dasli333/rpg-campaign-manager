import {inject, Injectable} from '@angular/core';
import {Race, RaceReference, Subrace} from "./models/race";
import {HttpClient} from "@angular/common/http";
import {Apollo} from "apollo-angular";
import {gql} from "@apollo/client";
import {Trait} from "./models/trait";
import {CharacterClass, CharacterClassReference} from "./models/character-class";
import {Observable, shareReplay} from "rxjs";
import {AbilityScore} from "./models/ability-score";
import {Skill} from "./models/skill";
import {Alignment} from "./models/alignment";
import {ProficiencyDetail} from "./models/proficiency";
import {Language} from "./models/language";

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
    return this.#apollo.query<{ race: Race }>({
      query: gql`
        query {
          race(index: "${index}") {
            index
            name
            alignment
            age
            size_description
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

  getAbilityScores() {
    return this.#apollo.query<{ abilityScores: AbilityScore[] }>({
      query: gql`
        query {
          abilityScores {
            index
            name
            full_name
            desc
          }
        }
      `
    });
  }

  getSkills() {
    return this.#apollo.query<{ skills: Skill[] }>({
      query: gql`
        query {
          skills {
            index
            name
            desc
            ability_score {
              index
              name
            }
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

  getClassDetails(index: string) {
    if (!this.#classDetailsCache[index]) {
      this.#classDetailsCache[index] = this.#http.get<CharacterClass>(`${this.#apiUrl}/api/classes/${index}`).pipe(
        shareReplay(1)
      );
    }
    return this.#classDetailsCache[index];
  }

  getAlignments() {
    return this.#apollo.query<{ alignments: Alignment[] }>({
      query: gql`
        query {
          alignments {
            index
            name
            abbreviation
            desc
          }
        }
      `
    });
  }

  getProficienciesByType(type: string) {
    return this.#apollo.query<{ proficiencies: ProficiencyDetail[] }>({
      query: gql`
        query {
          proficiencies(type: ${type}) {
            index
            name
            type
          }
        }
      `
    });
  }

  getBackgroundChoiceProficiencies() {
    return this.#apollo.query<{ proficiencies: ProficiencyDetail[], languages: Language[] }>({
      query: gql`
        query {
          proficiencies(type: [OTHER, ARTISANS_TOOLS, VEHICLES, GAMING_SETS, MUSICAL_INSTRUMENTS, SKILLS]) {
            name
            type
            index
          }
          languages {
            index
            name
          }
        }
      `
    });
  }
}

