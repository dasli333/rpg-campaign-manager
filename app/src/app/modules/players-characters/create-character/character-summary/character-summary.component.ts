import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IProficiencies} from "../../interfaces/player-character";

export interface CharacterSummaryData {
  image: string | ArrayBuffer | null | undefined
  imageFile: File | null
  characterDetails: {
    name: string
    gender: string
    age: number
    height: string
    weight: string
    alignment: string
    image: string
  }
  raceDetails: {
    race: string
    subrace: string
    traits: string[]
  }
  className: string
  personalCharacteristics: {
    background: string
    personalityTraits: string
    ideals: string
    bonds: string
    flaws: string
  }
  abilityScores: {
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
  }
  selectedSkills: string[],
  proficiencies: IProficiencies
}

@Component({
  selector: 'app-character-summary',
  standalone: true,
  imports: [],
  templateUrl: './character-summary.component.html',
  styleUrl: './character-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSummaryComponent {

  @Input({required: true}) characterSummaryData: CharacterSummaryData | undefined;
}
