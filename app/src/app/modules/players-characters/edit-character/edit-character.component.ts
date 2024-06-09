import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CampaignsService} from "../../campaigns/campaigns.service";
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgClass} from "@angular/common";
import {PlayerCharacterDataService} from "../player-character-data.service";
import {Attributes} from "../interfaces/attributes";

interface ISkillsProficiencies {
  acrobatics: boolean;
  animal_handling: boolean;
  arcana: boolean;
  athletics: boolean;
  deception: boolean;
  history: boolean;
  insight: boolean;
  intimidation: boolean;
  investigation: boolean;
  medicine: boolean;
  nature: boolean;
  perception: boolean;
  performance: boolean;
  persuasion: boolean;
  religion: boolean;
  sleight_of_hand: boolean;
  stealth: boolean;
  survival: boolean;
}

@Component({
  selector: 'app-edit-character',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatCardModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatCheckbox,
    MatGridListModule,
    NgClass
  ],
  templateUrl: './edit-character.component.html',
  styleUrl: './edit-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCharacterComponent {

  #campaignsService = inject(CampaignsService);
  #playerCharacterDataService = inject(PlayerCharacterDataService);
  #route = inject(ActivatedRoute);

  characterId = this.#route.snapshot.paramMap.get('id') || '';
  playerCharacter = this.#campaignsService.getPlayerCharacterById(this.characterId);
  skills = this.#playerCharacterDataService.skills();


  initialValues = this.playerCharacter();
  strengthModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.strength || 0));
  dexterityModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.dexterity || 0));
  constitutionModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.constitution || 0));
  intelligenceModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.intelligence || 0));
  wisdomModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.wisdom || 0));
  charismaModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.charisma || 0));
  proficiencyBonus = signal(this.getProficiencyBonus());

  skillsProficiencies = signal({
    acrobatics: this.initialValues?.skills_proficiencies?.includes('Skill: Acrobatics'),
    animal_handling: this.initialValues?.skills_proficiencies?.includes('Skill: Animal Handling'),
    arcana: this.initialValues?.skills_proficiencies?.includes('Skill: Arcana'),
    athletics: this.initialValues?.skills_proficiencies?.includes('Skill: Athletics'),
    deception: this.initialValues?.skills_proficiencies?.includes('Skill: Deception'),
    history: this.initialValues?.skills_proficiencies?.includes('Skill: History'),
    insight: this.initialValues?.skills_proficiencies?.includes('Skill: Insight'),
    intimidation: this.initialValues?.skills_proficiencies?.includes('Skill: Intimidation'),
    investigation: this.initialValues?.skills_proficiencies?.includes('Skill: Investigation'),
    medicine: this.initialValues?.skills_proficiencies?.includes('Skill: Medicine'),
    nature: this.initialValues?.skills_proficiencies?.includes('Skill: Nature'),
    perception: this.initialValues?.skills_proficiencies?.includes('Skill: Perception'),
    performance: this.initialValues?.skills_proficiencies?.includes('Skill: Performance'),
    persuasion: this.initialValues?.skills_proficiencies?.includes('Skill: Persuasion'),
    religion: this.initialValues?.skills_proficiencies?.includes('Skill: Religion'),
    sleight_of_hand: this.initialValues?.skills_proficiencies?.includes('Skill: Sleight of Hand'),
    stealth: this.initialValues?.skills_proficiencies?.includes('Skill: Stealth'),
    survival: this.initialValues?.skills_proficiencies?.includes('Skill: Survival')
  });

  constructor() {

  }

  getRaceName(): string {
    const subrace = this.initialValues?.subrace;

    if (subrace) {
      return `${this.initialValues?.race} (${subrace})`;
    } else {
      return this.initialValues?.race || '';
    }
  }

  updateSkillsProficiencies(skill: keyof ISkillsProficiencies) {
    this.skillsProficiencies.update((skillsProficiencies) => {
      return {
        ...skillsProficiencies,
        [skill]: !skillsProficiencies[skill]
      };
    });
  }

  updateAbilityScore(element: EventTarget | null, ability: keyof Attributes) {
    // TODO: form control
    const value = parseInt((element as HTMLInputElement)?.value, 10);
    switch (ability) {
      case 'strength':
        this.strengthModifier.set(this.getAbilityModifier(value));
        break;
      case 'dexterity':
        this.dexterityModifier.set(this.getAbilityModifier(value));
        break;
      case 'constitution':
        this.constitutionModifier.set(this.getAbilityModifier(value));
        break;
      case 'intelligence':
        this.intelligenceModifier.set(this.getAbilityModifier(value));
        break;
      case 'wisdom':
        this.wisdomModifier.set(this.getAbilityModifier(value));
        break;
      case 'charisma':
        this.charismaModifier.set(this.getAbilityModifier(value));
        break;
    }
  }

  getAbilityModifier(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2);
  }

  displayModifier(modifier: number): string {
    if (modifier >= 0) {
      return `+${modifier}`;
    } else {
      return `${modifier}`;
    }
  }

  getProficiencyBonus(): number {
    if (!this.initialValues) return 0;
    return Math.ceil(this.initialValues.level / 4) + 1;
  }

  getSkillModifier(skill: keyof ISkillsProficiencies, ability: keyof Attributes): string {
    const abilityScore = this.initialValues?.attributes[ability] || 0;
    const abilityModifier = this.getAbilityModifier(abilityScore);
    const proficiency = this.skillsProficiencies()[skill] ? this.proficiencyBonus() : 0;

    return this.displayModifier(abilityModifier + proficiency);
  }
}
