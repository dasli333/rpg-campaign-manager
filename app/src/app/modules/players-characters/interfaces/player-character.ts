import {Attributes} from "./attributes";

export interface IPlayerCharacter {
  _id?: string;
  name: string;
  gender: string;
  age: number;
  height: string;
  weight: string
  race: string;
  subrace: string;
  className: string;
  level: number;
  hit_die: number;
  currentHitPoints: number;
  temporaryHitPoints: number;
  image: string;
  experiencePoints: number;
  attributes: Attributes;
  alignment: string;
  background: string;
  personalityTraits: string;
  armorClass: number;
  inspiration: number;
  ideals: string;
  bonds: string;
  flaws: string;
  languages: string[];
  traits: string[];
  speed: number;
  weapons_proficiencies: string[];
  artisan_tools_proficiencies: string[];
  skills_proficiencies: string[];
  armor_proficiencies: string[];
  musical_instruments_proficiencies: string[];
  saving_throws_proficiencies: string[];
  other_proficiencies: string[];
  gaming_sets_proficiencies: string[];
  vehicles_proficiencies: string[];
  equipment: string[];
  spells: string[];
}

export interface IProficiencies {
  WEAPONS: string[];
  ARTISANS_TOOLS: string[];
  SKILLS: string[];
  ARMOR: string[];
  MUSICAL_INSTRUMENTS: string[];
  SAVING_THROWS: string[];
  OTHER: string[];
  GAMING_SETS: string[];
  VEHICLES: string[];
  LANGUAGES: string[];
}
