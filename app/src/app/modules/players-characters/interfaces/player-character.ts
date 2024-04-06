import {Attributes} from "./attributes";

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

