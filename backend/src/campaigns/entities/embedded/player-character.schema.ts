import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface Attributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

@Schema()
export class PlayerCharacter {
  @Prop({ required: true })
  name: string;

  @Prop()
  gender: string;

  @Prop()
  age: number;

  @Prop()
  height: string;

  @Prop()
  weight: string;

  @Prop()
  race: string;

  @Prop()
  subrace: string;

  @Prop()
  className: string;

  @Prop({ default: 1 })
  level: number;

  @Prop({ default: 0 })
  hit_die: number;

  @Prop({ default: 0 })
  numberOfHitDie: number;

  @Prop({ default: 0 })
  currentHitPoints: number;

  @Prop({ default: 0 })
  temporaryHitPoints: number;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  experiencePoints: number;

  @Prop({ type: Object})
  attributes: Attributes;

  @Prop()
  alignment: string;

  @Prop()
  background: string;

  @Prop()
  personalityTraits: string;

  @Prop()
  armorClass: number;

  @Prop({ default: 1 })
  inspiration: number;

  @Prop()
  ideals: string;

  @Prop()
  bonds: string;

  @Prop()
  flaws: string;

  @Prop({ type: [String] })
  languages: string[];

  @Prop({ type: [String] })
  traits: string[];

  @Prop()
  speed: number;

  @Prop({ type: [String] })
  skills_proficiencies: string[];

  @Prop({ type: [String] })
  saving_throws_proficiencies: string[];

  @Prop()
  otherProficienciesAndLanguages: string;

  @Prop({ type: [String] })
  equipment: string[];

  @Prop({ type: [String] })
  spells: string[];
}

export const PlayerCharacterSchema = SchemaFactory.createForClass(PlayerCharacter);
