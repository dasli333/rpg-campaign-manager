import {Injectable, signal, WritableSignal} from '@angular/core';
import {ProficiencyReference} from "../../data-services/models/proficiency";
import {Trait} from "../../data-services/models/trait";
import {AbilityScore} from "../../data-services/models/ability-score";
import {Skill} from "../../data-services/models/skill";
import {Alignment} from "../../data-services/models/alignment";

@Injectable({
  providedIn: 'root'
})
export class PlayerCharacterDataService {

  // TODO: Implement the following properties

  #proficiencies: WritableSignal<ProficiencyReference[]> = signal([]);
  proficiencies = this.#proficiencies.asReadonly();

  #traits: WritableSignal<Trait[]> = signal([]);
  traits = this.#traits.asReadonly();

  #abilityScores: WritableSignal<AbilityScore[]> = signal([]);
  abilityScores = this.#abilityScores.asReadonly();

  #skills: WritableSignal<Skill[]> = signal([]);
  skills = this.#skills.asReadonly();

  #alignments: WritableSignal<Alignment[]> = signal([]);
  alignments = this.#alignments.asReadonly();


  constructor() { }

  setProficiencies(proficiencies: ProficiencyReference[]) {
    this.#proficiencies.set(proficiencies)
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

}
