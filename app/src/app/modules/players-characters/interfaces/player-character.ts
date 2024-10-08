import {Attributes} from "./attributes";
import {IEquippedInventory} from "./equipment";
import {Spells} from "./spells";

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
  numberOfHitDie: number;
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
  traits: string;
  speed: number;
  skills_proficiencies: string[];
  saving_throws_proficiencies: string[];
  otherProficienciesAndLanguages: string;
  equipment: string;
  equippedInventory: IEquippedInventory;
  spells: Spells;
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


