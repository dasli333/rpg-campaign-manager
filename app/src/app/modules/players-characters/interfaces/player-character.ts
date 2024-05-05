import {Attributes} from "./attributes";

// TODO: update the interface to include the new fields
export interface PlayerCharacter {
  _id: string;
  name: string;
  gender: string;
  age: number;
  race: string;
  class: string;
  level: number;
  image: string;
  experiencePoints: number;
  attributes: Attributes;
}

