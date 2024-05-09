import {Attributes} from "./attributes";
import {CharacterSummaryData} from "../create-character/character-summary/character-summary.component";
import {ProficiencyDetail} from "../../../data-services/models/proficiency";

// TODO: update the interface to include the new fields
export interface IPlayerCharacter {
  _id: string;
  name: string;
  gender: string;
  age: number;
  height: string;
  weight: string
  race: string;
  subrace: string;
  class: string;
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
  // proficiencies: IProficiencies;

  weapons_proficiencies: string[];
  artisan_tools_proficiencies: string[];
  skills_proficiencies: string[];
  armor_proficiencies: string[];
  musical_instruments_proficiencies: string[];
  saving_throws_proficiencies: string[];
  other_proficiencies: string[];
  gaming_sets_proficiencies: string[];
  vehicles_proficiencies: string[];
  languages_proficiencies: string[];
  equipment: string[];
  spells: string[];
  features: string[];
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
  _id: string = '';
  name: string;
  gender: string;
  age: number;
  height: string;
  weight: string;
  race: string;
  subrace: string;
  class: string;
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
  // TODO: maybe use similar structure as in the ProficiencyDetail
  // proficiencies: IProficiencies = {
  //   WEAPONS: [],
  //   ARTISANS_TOOLS: [],
  //   SKILLS: [],
  //   ARMOR: [],
  //   MUSICAL_INSTRUMENTS: [],
  //   SAVING_THROWS: [],
  //   OTHER: [],
  //   GAMING_SETS: [],
  //   VEHICLES: [],
  //   LANGUAGES: []
  // };
  weapons_proficiencies: string[] = [];
  artisan_tools_proficiencies: string[] = [];
  skills_proficiencies: string[] = [];
  armor_proficiencies: string[] = [];
  musical_instruments_proficiencies: string[] = [];
  saving_throws_proficiencies: string[] = [];
  other_proficiencies: string[] = [];
  gaming_sets_proficiencies: string[] = [];
  vehicles_proficiencies: string[] = [];
  languages_proficiencies: string[] = [];
  equipment: string[] = [];
  spells: string[] = [];
  features: string[] = [];

  constructor(data: CharacterSummaryData) {
    this.name = data.characterDetails.name;
    this.gender = data.characterDetails.gender;
    this.age = data.characterDetails.age;
    this.height = data.characterDetails.height;
    this.weight = data.characterDetails.weight;
    this.race = data.raceDetails.race;
    this.subrace = data.raceDetails.subrace;
    this.class = data.className;
    this.alignment = data.characterDetails.alignment;
    this.background = data.personalCharacteristics.background;
    this.personalityTraits = data.personalCharacteristics.personalityTraits;
    this.ideals = data.personalCharacteristics.ideals;
    this.bonds = data.personalCharacteristics.bonds;
    this.flaws = data.personalCharacteristics.flaws;
    this.attributes = data.abilityScores;
    this.traits = data.raceDetails.traits;
    this.weapons_proficiencies = data.proficiencies.WEAPONS;
    this.artisan_tools_proficiencies = data.proficiencies.ARTISANS_TOOLS;
    this.skills_proficiencies = data.proficiencies.SKILLS;
    this.armor_proficiencies = data.proficiencies.ARMOR;
    this.musical_instruments_proficiencies = data.proficiencies.MUSICAL_INSTRUMENTS;
    this.saving_throws_proficiencies = data.proficiencies.SAVING_THROWS;
    this.other_proficiencies = data.proficiencies.OTHER;
    this.gaming_sets_proficiencies = data.proficiencies.GAMING_SETS;
    this.vehicles_proficiencies = data.proficiencies.VEHICLES;
    this.languages_proficiencies = data.proficiencies.LANGUAGES;
  }

  addTraits(traits: string[]) {
    this.traits = [...this.traits, ...traits];
  }
}
