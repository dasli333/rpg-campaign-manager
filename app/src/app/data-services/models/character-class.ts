import {ProficiencyOption, ProficiencyReference} from "./proficiency";

export interface CharacterClassReference {
  index: string;
  name: string;
  url: string;
}

export interface CharacterClass {
  index: string;
  name: string;
  hit_die: number;
  proficiency_choices: ProficiencyOption[];
  proficiencies: ProficiencyReference[];
  saving_throws: AbilityScore[];
  starting_equipment: StartingEquipment[];
  starting_equipment_options: EquipmentChoice[];
  class_levels: string;
  multi_classing: MultiClassing;
  subclasses: Subclass[];
  spellcasting: Spellcasting;
  spells: string;
  url: string;
}

interface Equipment {
  index: string;
  name: string;
  url: string;
}

interface AbilityScore {
  index: string;
  name: string;
  url: string;
}

interface EquipmentOption {
  count?: number;
  of?: Equipment;
  choice?: EquipmentChoice;
}

interface EquipmentChoice {
  desc: string;
  choose: number;
  type: string;
  from: EquipmentOptionSet;
}

interface EquipmentOptionSet {
  option_set_type: string;
  equipment_category?: EquipmentCategory;
  options?: EquipmentOption[];
}

interface EquipmentCategory {
  index: string;
  name: string;
  url: string;
}

interface ClassLevel {
  url: string;
}

interface MultiClassing {
  prerequisites: Prerequisite[];
  proficiencies: ProficiencyReference[];
  proficiency_choices: ProficiencyOption[];
}

interface Prerequisite {
  ability_score: AbilityScore;
  minimum_score: number;
}

interface Subclass {
  index: string;
  name: string;
  url: string;
}

interface Spellcasting {
  level: number;
  spellcasting_ability: AbilityScore;
  info: SpellcastingInfo[];
}

interface SpellcastingInfo {
  name: string;
  desc: string[];
}

interface StartingEquipment {
  equipment: Equipment;
  quantity: number;
}

