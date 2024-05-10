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
  races: any[];
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
    filteredOptions?: ProficiencyItemOption[];
    option_set_type: string;
    options: ProficiencyItemOption[];
  };
}

interface ProficiencyItemOption {
  option_type: string;
  item?: ProficiencyReference;
  choice?: ProficiencyOption;
}

export interface Proficiencies {
  WEAPONS: ProficiencyDetail[];
  ARTISANS_TOOLS: ProficiencyDetail[];
  SKILLS: ProficiencyDetail[];
  ARMOR: ProficiencyDetail[];
  MUSICAL_INSTRUMENTS: ProficiencyDetail[];
  SAVING_THROWS: ProficiencyDetail[];
  OTHER: ProficiencyDetail[];
  GAMING_SETS: ProficiencyDetail[];
  VEHICLES: ProficiencyDetail[];
}

export enum ProficiencyType {
  WEAPONS = "WEAPONS",
  ARTISANS_TOOLS = "ARTISANS_TOOLS",
  SKILLS = "SKILLS",
  ARMOR = "ARMOR",
  MUSICAL_INSTRUMENTS = "MUSICAL_INSTRUMENTS",
  SAVING_THROWS = "SAVING_THROWS",
  OTHER = "OTHER",
  GAMING_SETS = "GAMING_SETS",
  VEHICLES = "VEHICLES"
}
