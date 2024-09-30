export interface Spells {
  cantrips: Spell[];
  level1: Spell[];
  level2: Spell[];
  level3: Spell[];
  level4: Spell[];
  level5: Spell[];
  level6: Spell[];
  level7: Spell[];
  level8: Spell[];
  level9: Spell[];
}

export interface Spell {
  name: string;
  prepared: boolean;
}
