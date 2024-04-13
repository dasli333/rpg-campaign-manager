import {RaceReference, SubraceReference} from "./race";
import {ProficiencyReference} from "./proficiency";

export interface Trait {
  index: string;
  races: RaceReference[];
  subraces: SubraceReference[];
  name: string;
  desc: string[];
  proficiencies: ProficiencyReference[];
  url: string;
}

export interface TraitReference {
  index: string;
  name: string;
  url: string;
}



