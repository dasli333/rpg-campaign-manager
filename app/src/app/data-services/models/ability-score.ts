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

export interface AbilityBonus {
  ability_score: AbilityScoreReference
  bonus: number;
}

export interface AbilityBonusOptions {
  choose: number;
  type: string;
  from: AbilityBonusOptionSet;
}

interface AbilityBonusOptionSet {
  option_set_type: string;
  options: AbilityBonusOption[];
}

interface AbilityBonusOption {
  option_type: string;
  ability_score: AbilityScoreReference;
  bonus: number;
}

