import {Injectable, signal, WritableSignal} from '@angular/core';
import {ProficiencyReference} from "../../data-services/models/proficiency";
import {Trait} from "../../data-services/models/trait";

@Injectable({
  providedIn: 'root'
})
export class PlayerCharacterDataService {

  // TODO: Implement the following properties

  #proficiencies: WritableSignal<ProficiencyReference[]> = signal([]);
  proficiencies = this.#proficiencies.asReadonly();

  #traits: WritableSignal<Trait[]> = signal([]);
  traits = this.#traits.asReadonly();


  constructor() { }

  setProficiencies(proficiencies: ProficiencyReference[]) {
    this.#proficiencies.set(proficiencies)
  }

  setTraits(traits: Trait[]) {
    this.#traits.set(traits)
  }

}
