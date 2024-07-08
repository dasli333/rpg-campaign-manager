export interface IEquippedInventory {
  armor: IArmor | null;
  shield: IEquipment | null;
  helmet: IEquipment | null;
  ring1: IEquipment | null;
  ring2: IEquipment | null;
  cloak: IEquipment | null;
  boots: IEquipment | null;
  gloves: IEquipment | null;
  weapons: IWeapon[];
  necklace: IEquipment | null;
}

export interface IWeapon {
  name: string;
  attackBonus: string;
  damage_type: string;
}

export interface IArmor {
  name: string;
  armorClass: number;
  dexterityBonus: boolean;
  maxBonus: number;
  notes: string;
}

export interface IEquipment {
  name: string;
  armorClassBonus: number;
  notes: string;
}
