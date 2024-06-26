import {Injectable, signal, WritableSignal} from '@angular/core';
import {ProficiencyDetail} from "../../data-services/models/proficiency";
import {Trait} from "../../data-services/models/trait";
import {AbilityScore} from "../../data-services/models/ability-score";
import {Skill} from "../../data-services/models/skill";
import {Alignment} from "../../data-services/models/alignment";
import {Language} from "../../data-services/models/language";

@Injectable({
  providedIn: 'root'
})
export class PlayerCharacterDataService {


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
    const newProficiencies = proficiencies.filter((proficiency) => {
      return !this.#proficiencies().some((p) => p.index === proficiency.index)
    })
    if (newProficiencies.length === 0) return;
    this.#proficiencies.update((p) => [...p, ...newProficiencies]);
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
