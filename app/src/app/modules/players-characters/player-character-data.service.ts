import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Proficiencies, ProficiencyDetail, ProficiencyReference} from "../../data-services/models/proficiency";
import {Trait} from "../../data-services/models/trait";
import {AbilityScore} from "../../data-services/models/ability-score";
import {Skill} from "../../data-services/models/skill";
import {Alignment} from "../../data-services/models/alignment";
import {Language} from "../../data-services/models/language";
import {HttpService} from "../../http/http.service";
import {PlayerCharacter} from "./interfaces/player-character";

@Injectable({
  providedIn: 'root'
})
export class PlayerCharacterDataService {

  #httpService = inject(HttpService);

  #proficiencies: WritableSignal<ProficiencyDetail[]> = signal([])
  proficiencies = this.#proficiencies.asReadonly();

  #traits: WritableSignal<Trait[]> = signal([]);
  traits = this.#traits.asReadonly();

  #abilityScores: WritableSignal<AbilityScore[]> = signal([]);
  abilityScores = this.#abilityScores.asReadonly();

  #skills: WritableSignal<Skill[]> = signal([]);
  skills = this.#skills.asReadonly();

  #alignments: WritableSignal<Alignment[]> = signal([]);
  alignments = this.#alignments.asReadonly();

  #languages: WritableSignal<Language[]> = signal([]);
  languages = this.#languages.asReadonly();



  constructor() { }

  setProficiencies(proficiencies: ProficiencyDetail[]) {
    this.#proficiencies.update((p) => [...p, ...proficiencies]);
  }

  // updateProficiencyType(type: keyof Proficiencies, proficiencies: ProficiencyDetail[]) {
  //   this.#proficiencies.update((proficienciesMap) => {
  //     proficienciesMap[type] = proficiencies;
  //     return proficienciesMap;
  //   });
  //
  // }

  setTraits(traits: Trait[]) {
    this.#traits.set(traits)
  }

  setAbilitiesScores(abilityScores: AbilityScore[]) {
    this.#abilityScores.set(abilityScores)
  }

  setSkills(skills: Skill[]) {
    this.#skills.set(skills)
  }

  setAlignments(alignments: Alignment[]) {
    this.#alignments.set(alignments)
  }

  setLanguages(languages: Language[]) {
    this.#languages.set(languages)
  }

}
