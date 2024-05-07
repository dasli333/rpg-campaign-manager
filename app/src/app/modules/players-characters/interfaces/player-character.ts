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
  skills: string[];
  alignment: string;
  background: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  languages: string[];
  traits: string[];
  proficiencies: IProficiencies;
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
  skills: string[];
  alignment: string;
  background: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  languages: string[] = [];
  traits: string[];
  // TODO: maybe use similar structure as in the ProficiencyDetail
  proficiencies: IProficiencies = {
    WEAPONS: [],
    ARTISANS_TOOLS: [],
    SKILLS: [],
    ARMOR: [],
    MUSICAL_INSTRUMENTS: [],
    SAVING_THROWS: [],
    OTHER: [],
    GAMING_SETS: [],
    VEHICLES: [],
    LANGUAGES: []
  };
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
    // TODO: SKILLS not needed
    this.skills = data.selectedSkills;
    this.traits = data.raceDetails.traits;
  }

  addTraits(traits: string[]) {
    this.traits = [...this.traits, ...traits];
  }
}
