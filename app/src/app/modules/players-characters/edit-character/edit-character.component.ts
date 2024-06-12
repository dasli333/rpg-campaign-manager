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
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

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
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './edit-character.component.html',
  styleUrl: './edit-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCharacterComponent {

  #campaignsService = inject(CampaignsService);
  #playerCharacterDataService = inject(PlayerCharacterDataService);
  #route = inject(ActivatedRoute);
  #formBuilder = inject(FormBuilder);

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

  abilityScoresForm = this.#formBuilder.group({
    strength: [this.initialValues?.attributes?.strength, [Validators.required, Validators.min(1), Validators.max(30), Validators.pattern('[0-9]{1,2}')]],
    dexterity: [this.initialValues?.attributes?.dexterity, [Validators.required, Validators.min(1), Validators.max(30), Validators.pattern('[0-9]{1,2}')]],
    constitution: [this.initialValues?.attributes?.constitution, [Validators.required, Validators.min(1), Validators.max(30), Validators.pattern('[0-9]{1,2}')]],
    intelligence: [this.initialValues?.attributes?.intelligence, [Validators.required, Validators.min(1), Validators.max(30), Validators.pattern('[0-9]{1,2}')]],
    wisdom: [this.initialValues?.attributes?.wisdom, [Validators.required, Validators.min(1), Validators.max(30), Validators.pattern('[0-9]{1,2}')]],
    charisma: [this.initialValues?.attributes?.charisma, [Validators.required, Validators.min(1), Validators.max(30), Validators.pattern('[0-9]{1,2}')]]
  })

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

  savingThrowProficiencies = signal({
    strength: this.initialValues?.saving_throws_proficiencies?.includes('Saving Throw: STR'),
    dexterity: this.initialValues?.saving_throws_proficiencies?.includes('Saving Throw: DEX'),
    constitution: this.initialValues?.saving_throws_proficiencies?.includes('Saving Throw: CON'),
    intelligence: this.initialValues?.saving_throws_proficiencies?.includes('Saving Throw: INT'),
    wisdom: this.initialValues?.saving_throws_proficiencies?.includes('Saving Throw: WIS'),
    charisma: this.initialValues?.saving_throws_proficiencies?.includes('Saving Throw: CHA')
  })

  constructor() {
    this.abilityScoresForm.valueChanges.subscribe((value) => {
      if (this.abilityScoresForm.invalid) return;
      this.updateAbilityScores();
    });
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

  updateSavingThrowProficiencies(ability: keyof Attributes) {
    this.savingThrowProficiencies.update((savingThrowProficiencies) => {
      return {
        ...savingThrowProficiencies,
        [ability]: !savingThrowProficiencies[ability]
      };
    });
  }

  updateAbilityScores() {
    const formValue = this.abilityScoresForm.value;
    this.strengthModifier.set(this.getAbilityModifier(parseInt(String(formValue.strength) , 10)));
    this.dexterityModifier.set(this.getAbilityModifier(parseInt(String(formValue.dexterity) , 10)));
    this.constitutionModifier.set(this.getAbilityModifier(parseInt(String(formValue.constitution) , 10)));
    this.intelligenceModifier.set(this.getAbilityModifier(parseInt(String(formValue.intelligence) , 10)));
    this.wisdomModifier.set(this.getAbilityModifier(parseInt(String(formValue.wisdom) , 10)));
    this.charismaModifier.set(this.getAbilityModifier(parseInt(String(formValue.charisma) , 10)));
  }

  getAbilityModifier(abilityValue: number): number {
    if (isNaN(abilityValue)) return 0;
    return Math.floor((abilityValue - 10) / 2);
  }

  displayModifier(modifier: number | undefined | null): string {
    if (modifier === undefined || modifier === null) return '';
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

  getSkillModifier(skill: keyof ISkillsProficiencies | 'saving_throw', ability: keyof Attributes): string {
    let abilityModifier: number;
    let proficiency: number;
    switch (ability) {
      case 'strength':
        abilityModifier = this.strengthModifier();
        break;
      case 'dexterity':
        abilityModifier = this.dexterityModifier();
        break;
      case 'constitution':
        abilityModifier = this.constitutionModifier();
        break;
      case 'intelligence':
        abilityModifier = this.intelligenceModifier();
        break;
      case 'wisdom':
        abilityModifier = this.wisdomModifier();
        break;
      case 'charisma':
        abilityModifier = this.charismaModifier();
        break;
      default:
        abilityModifier = 0;
    }
    if (skill === 'saving_throw') {
      proficiency = this.savingThrowProficiencies()[ability] ? this.proficiencyBonus() : 0;
    } else {
      proficiency = this.skillsProficiencies()[skill] ? this.proficiencyBonus() : 0;
    }

    return this.displayModifier(abilityModifier + proficiency);
  }
}
