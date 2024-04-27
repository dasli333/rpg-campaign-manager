import {Injectable, signal, WritableSignal} from '@angular/core';
import {Proficiencies, ProficiencyDetail} from "../../data-services/models/proficiency";
import {Trait} from "../../data-services/models/trait";
import {AbilityScore} from "../../data-services/models/ability-score";
import {Skill} from "../../data-services/models/skill";
import {Alignment} from "../../data-services/models/alignment";
import {Language} from "../../data-services/models/language";

@Injectable({
  providedIn: 'root'
})
export class PlayerCharacterDataService {

  // TODO: Implement the following properties

  #proficiencies: WritableSignal<Proficiencies> = signal({WEAPONS: [], ARMOR: [], ARTISANS_TOOLS: [], SKILLS: [], SAVING_THROWS: [], OTHER: [], GAMING_SETS: [], VEHICLES: [], MUSICAL_INSTRUMENTS: []})
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

  setProficiencies(proficiencies: Proficiencies) {
    this.#proficiencies.set(proficiencies)
  }

  updateProficiencyType(type: keyof Proficiencies, proficiencies: ProficiencyDetail[]) {
    this.#proficiencies.update((proficienciesMap) => {
      proficienciesMap[type] = proficiencies;
      return proficienciesMap;
    });

  }

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
