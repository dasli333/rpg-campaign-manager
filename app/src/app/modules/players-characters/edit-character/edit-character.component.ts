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
import {MatTabsModule} from "@angular/material/tabs";
import {ImageUploadComponent} from "../../helpers/image-upload/image-upload.component";
import {IMAGE_URL} from "../../../../config";
import {IPlayerCharacter} from "../interfaces/player-character";

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
    MatTabsModule,
    MatGridListModule,
    NgClass,
    ReactiveFormsModule,
    ImageUploadComponent
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

  // TODO: add gain of level
  level = signal(this.initialValues?.level || 1);

  strengthModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.strength || 0));
  dexterityModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.dexterity || 0));
  constitutionModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.constitution || 0));
  intelligenceModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.intelligence || 0));
  wisdomModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.wisdom || 0));
  charismaModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.charisma || 0));
  proficiencyBonus = signal(this.getProficiencyBonus());

  characterSheetForm = this.#formBuilder.group({
    name: [this.initialValues?.name, Validators.required],
    className: [this.initialValues?.className, Validators.required],
    background: [this.initialValues?.background, Validators.required],
    alignment: [this.initialValues?.alignment, Validators.required],
    experiencePoints: [this.initialValues?.experiencePoints, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
    inspiration: [this.initialValues?.inspiration, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
    armorClass: [this.initialValues?.armorClass, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
    speed: [this.initialValues?.speed, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
    numberOfHitDie: [this.initialValues?.numberOfHitDie, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
    currentHitPoints: [this.getCurrentHitPoints(), [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
    temporaryHitPoints: [this.initialValues?.temporaryHitPoints, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
    age: [this.initialValues?.age, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
    height: [this.initialValues?.height, Validators.required],
    weight: [this.initialValues?.weight, Validators.required],
    personalityTraits: [this.initialValues?.personalityTraits, Validators.required],
    ideals: [this.initialValues?.ideals, Validators.required],
    bonds: [this.initialValues?.bonds, Validators.required],
    flaws: [this.initialValues?.flaws, Validators.required],
  });

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

  saveCharacter() {
    if (this.characterSheetForm.invalid || this.abilityScoresForm.invalid || !this.initialValues) return;
    const character: IPlayerCharacter = {
      ...this.initialValues,
      _id: this.characterId,
      name: this.characterSheetForm.value.name || '',
      className: this.characterSheetForm.value.className || '',
      background: this.characterSheetForm.value.background || '',
      alignment: this.characterSheetForm.value.alignment || '',
      experiencePoints: this.characterSheetForm.value.experiencePoints || 0,
      inspiration: this.characterSheetForm.value.inspiration || 0,
      armorClass: this.characterSheetForm.value.armorClass || 0,
      speed: this.characterSheetForm.value.speed || 0,
      numberOfHitDie: this.characterSheetForm.value.numberOfHitDie || 0,
      currentHitPoints: this.characterSheetForm.value.currentHitPoints || 0,
      temporaryHitPoints: this.characterSheetForm.value.temporaryHitPoints || 0,
      age: this.characterSheetForm.value.age || 0,
      height: this.characterSheetForm.value.height || '',
      weight: this.characterSheetForm.value.weight || '',
      personalityTraits: this.characterSheetForm.value.personalityTraits || '',
      ideals: this.characterSheetForm.value.ideals || '',
      bonds: this.characterSheetForm.value.bonds || '',
      flaws: this.characterSheetForm.value.flaws || '',
      attributes: {
        strength: this.abilityScoresForm.value.strength || 3,
        dexterity: this.abilityScoresForm.value.dexterity || 3,
        constitution: this.abilityScoresForm.value.constitution || 3,
        intelligence: this.abilityScoresForm.value.intelligence || 3,
        wisdom: this.abilityScoresForm.value.wisdom || 3,
        charisma: this.abilityScoresForm.value.charisma || 3
      },
      skills_proficiencies: Object.entries(this.skillsProficiencies()).filter(([_, value]) => value).map(([key]) => {
        switch (key) {
          case 'animal_handling':
            return 'Skill: Animal Handling';
          case 'sleight_of_hand':
            return 'Skill: Sleight of Hand';
          default:
            const index = key.charAt(0).toUpperCase() + key.slice(1);
            return `Skill: ${index}`;
        }
      }),
      saving_throws_proficiencies: Object.entries(this.savingThrowProficiencies()).filter(([_, value]) => value).map(([key]) => {
        const index = key.substring(0, 3).toUpperCase();
        return `Saving Throw: ${index}`;
      }),
      image: this.initialValues?.image || '',
    }

    console.log(character)

    // this.#campaignsService.updatePlayerCharacter(character);
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

  getMaximumHitPoints(): number {
    if (!this.initialValues) return 0;
    const averageRoll = this.initialValues.hit_die / 2 + 1;
    const firstLevelHitPoints = this.initialValues.hit_die + this.constitutionModifier();
    return firstLevelHitPoints + (averageRoll + this.constitutionModifier()) * (this.initialValues.level - 1);
  }

  getArmorClass(): number {
    if (this.initialValues?.armorClass) {
      return this.initialValues.armorClass;
    }
    return 10 + this.dexterityModifier();
  }

  getCurrentHitPoints(): number {
    return this.initialValues?.currentHitPoints || this.getMaximumHitPoints();
  }

  getTemporaryHitPoints(): number {
    return this.initialValues?.temporaryHitPoints || 0;
  }

  getPassiveWisdomPerception(): number {
    const perceptionModifier = this.getSkillModifier('perception', 'wisdom');
    return 10 + parseInt(perceptionModifier, 10);
  }

  getInspiration(): number {
    return this.initialValues?.inspiration || 0;
  }

  protected readonly IMAGE_URL = IMAGE_URL;
}
