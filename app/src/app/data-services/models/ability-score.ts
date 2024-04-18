import {SkillReference} from "./skill";

export interface AbilityScore {
  index: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
  name: string;
  full_name: string;
  desc: string[];
  skills: SkillReference[];
  url: string;
}

export interface AbilityScoreReference {
  index: string;
  name: string;
  url: string;
}

