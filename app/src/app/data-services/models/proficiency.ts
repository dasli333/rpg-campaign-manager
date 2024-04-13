export interface ProficiencyReference {
  index: string;
  name: string;
  url: string;
}

export interface ProficiencyOption {
  desc: string;
  choose: number;
  type: string;
  from: {
    option_set_type: string;
    options: ProficiencyItemOption[];
  };
}

interface ProficiencyItemOption {
  option_type: string;
  item: ProficiencyReference;
}
