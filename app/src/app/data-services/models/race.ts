import {TraitReference} from "./trait";
import {ProficiencyOption, ProficiencyReference} from "./proficiency";

export interface Race {
  index: string;
  name: string;
  speed: number;
  ability_bonuses: AbilityBonus[];
  ability_bonus_options: AbilityBonusOptions;
  alignment: string;
  age: string;
  size: string;
  size_description: string;
  starting_proficiencies: ProficiencyReference[];
  starting_proficiency_options: ProficiencyOption;
  languages: LanguageReference[];
  language_desc: string;
  traits: TraitReference[];
  subraces: SubraceReference[];
  url: string;
}

export interface Subrace {
  index: string;
  name: string;
  race: RaceReference;
  desc: string;
  ability_bonuses: AbilityBonus[];
  ability_bonus_options: AbilityBonusOptions;
  starting_proficiencies: ProficiencyReference[];
  languages: LanguageReference[]; // Assuming this might be filled in other scenarios
  language_options: LanguageOption;
  racial_traits: TraitReference[];
  url: string;
}

interface AbilityBonus {
  ability_score: AbilityScoreReference
  bonus: number;
}

interface AbilityBonusOptions {
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

interface AbilityScoreReference {
  index: string;
  name: string;
  url: string;
}

export interface SubraceReference {
  index: string;
  name: string;
  url: string;
}

export interface RaceReference {
  index: string;
  name: string;
}

interface LanguageReference {
  index: string;
  name: string;
  url: string;
}

interface LanguageOption {
  choose: number;
  from: {
    option_set_type: string;
    options: LanguageItemOption[];
  };
  type: string;
}

interface LanguageItemOption {
  option_type: string;
  item: LanguageReference;
}



