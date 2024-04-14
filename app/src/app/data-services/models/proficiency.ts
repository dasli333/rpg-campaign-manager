import {CharacterClassReference} from "./character-class";

export interface ProficiencyReference {
  index: string;
  name: string;
  url: string;
}

export interface ProficiencyDetail {
  index: string;
  type: string;
  name: string;
  classes: CharacterClassReference[];
  races: any[]; // Empty array, can be defined more specifically if races objects are known
  url: string;
  reference: {
    index: string;
    name: string;
    url: string;
  };
}

export interface ProficiencyOption {
  desc: string;
  choose: number;
  type: string;
  from: {
    option_set_type: string;
    options: ProficiencyItemOption[];
  };
}

interface ProficiencyItemOption {
  option_type: string;
  item: ProficiencyReference;
}
