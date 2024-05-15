import {Attributes} from "./attributes";

export interface IPlayerCharacter {
  name: string;
  gender: string;
  age: number;
  height: string;
  weight: string
  race: string;
  subrace: string;
  className: string;
  level: number;
  image: string;
  experiencePoints: number;
  attributes: Attributes;
  alignment: string;
  background: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  languages: string[];
  traits: string[];
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

export class PlayerCharacter implements IPlayerCharacter {
  _id!: string;
  name: string;
  gender: string;
  age: number;
  height: string;
  weight: string;
  race: string;
  subrace: string;
  className: string;
  level: number = 1;
  image: string = '';
  experiencePoints: number = 0;
  attributes: Attributes;
  alignment: string;
  background: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  languages: string[] = [];
  traits: string[];
  weapons_proficiencies: string[] = [];
  artisan_tools_proficiencies: string[] = [];
  skills_proficiencies: string[] = [];
  armor_proficiencies: string[] = [];
  musical_instruments_proficiencies: string[] = [];
  saving_throws_proficiencies: string[] = [];
  other_proficiencies: string[] = [];
  gaming_sets_proficiencies: string[] = [];
  vehicles_proficiencies: string[] = [];
  equipment: string[] = [];
  spells: string[] = [];

  constructor(data: IPlayerCharacter) {
    this.name = data.name;
    this.gender = data.gender;
    this.age = data.age;
    this.height = data.height;
    this.weight = data.weight;
    this.race = data.race;
    this.subrace = data.subrace;
    this.className = data.className;
    this.level = data.level;
    this.image = data.image;
    this.experiencePoints = data.experiencePoints;
    this.attributes = data.attributes;
    this.alignment = data.alignment;
    this.background = data.background;
    this.personalityTraits = data.personalityTraits;
    this.ideals = data.ideals;
    this.bonds = data.bonds;
    this.flaws = data.flaws;
    this.languages = data.languages;
    this.traits = data.traits;
    this.weapons_proficiencies = data.weapons_proficiencies;
    this.artisan_tools_proficiencies = data.artisan_tools_proficiencies;
    this.skills_proficiencies = data.skills_proficiencies;
    this.armor_proficiencies = data.armor_proficiencies;
    this.musical_instruments_proficiencies = data.musical_instruments_proficiencies;
    this.saving_throws_proficiencies = data.saving_throws_proficiencies;
    this.other_proficiencies = data.other_proficiencies;
    this.gaming_sets_proficiencies = data.gaming_sets_proficiencies;
    this.vehicles_proficiencies = data.vehicles_proficiencies;
    this.equipment = data.equipment;
    this.spells = data.spells;
  }

  addTraits(traits: string[]) {
    this.traits = [...this.traits, ...traits];
  }
}
