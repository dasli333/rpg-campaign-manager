import {AbilityScoreReference} from "./ability-score";

export interface SkillReference {
  name: string;
  index: string;
  url: string;
}

export interface Skill {
  index: string;
  name: string;
  desc: string[];
  ability_score: AbilityScoreReference;
  url: string;
}


