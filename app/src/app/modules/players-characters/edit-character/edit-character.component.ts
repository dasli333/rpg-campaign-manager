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
import {IArmor, IEquipment, IEquippedInventory, IWeapon} from "../interfaces/equipment";

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
    background: [this.initialValues?.background, Validators.required],
    alignment: [this.initialValues?.alignment, Validators.required],
    experiencePoints: [this.initialValues?.experiencePoints, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
    inspiration: [this.initialValues?.inspiration, [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
    armorClass: [this.getArmorClass(), [Validators.required, Validators.min(0), Validators.pattern('[0-9]+')]],
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
    equipment: [this.initialValues?.equipment, Validators.required],
    otherProficienciesAndLanguages: [this.initialValues?.otherProficienciesAndLanguages, Validators.required],
    equippedArmorName: [this.initialValues?.equippedInventory.armor?.name],
    equippedArmorClass: [this.initialValues?.equippedInventory.armor?.armorClass],
    equippedArmorMaxBonus: [this.initialValues?.equippedInventory.armor?.maxBonus],
    equippedArmorNotes: [this.initialValues?.equippedInventory.armor?.notes],
    equippedArmorDexterityBonus: [this.initialValues?.equippedInventory.armor?.dexterityBonus],
    equippedShieldName: [this.initialValues?.equippedInventory.shield?.name],
    equippedShieldArmorClassBonus: [this.initialValues?.equippedInventory.shield?.armorClassBonus],
    equippedShieldNotes: [this.initialValues?.equippedInventory.shield?.notes],
    equippedHelmetName: [this.initialValues?.equippedInventory.helmet?.name],
    equippedHelmetArmorClassBonus: [this.initialValues?.equippedInventory.helmet?.armorClassBonus],
    equippedHelmetNotes: [this.initialValues?.equippedInventory.helmet?.notes],
    equippedRing1Name: [this.initialValues?.equippedInventory.ring1?.name],
    equippedRing1ArmorClassBonus: [this.initialValues?.equippedInventory.ring1?.armorClassBonus],
    equippedRing1Notes: [this.initialValues?.equippedInventory.ring1?.notes],
    equippedRing2Name: [this.initialValues?.equippedInventory.ring2?.name],
    equippedRing2ArmorClassBonus: [this.initialValues?.equippedInventory.ring2?.armorClassBonus],
    equippedRing2Notes: [this.initialValues?.equippedInventory.ring2?.notes],
    equippedCloakName: [this.initialValues?.equippedInventory.cloak?.name],
    equippedCloakArmorClassBonus: [this.initialValues?.equippedInventory.cloak?.armorClassBonus],
    equippedCloakNotes: [this.initialValues?.equippedInventory.cloak?.notes],
    equippedBootsName: [this.initialValues?.equippedInventory.boots?.name],
    equippedBootsArmorClassBonus: [this.initialValues?.equippedInventory.boots?.armorClassBonus],
    equippedBootsNotes: [this.initialValues?.equippedInventory.boots?.notes],
    equippedGlovesName: [this.initialValues?.equippedInventory.gloves?.name],
    equippedGlovesArmorClassBonus: [this.initialValues?.equippedInventory.gloves?.armorClassBonus],
    equippedGlovesNotes: [this.initialValues?.equippedInventory.gloves?.notes],
    equippedNecklaceName: [this.initialValues?.equippedInventory.necklace?.name],
    equippedNecklaceArmorClassBonus: [this.initialValues?.equippedInventory.necklace?.armorClassBonus],
    equippedNecklaceNotes: [this.initialValues?.equippedInventory.necklace?.notes],
    equippedWeapon1Name: [this.initialValues?.equippedInventory.weapons[0]?.name],
    equippedWeapon1AttackBonus: [this.initialValues?.equippedInventory.weapons[0]?.attackBonus],
    equippedWeapon1DamageType: [this.initialValues?.equippedInventory.weapons[0]?.damage_type],
    equippedWeapon2Name: [this.initialValues?.equippedInventory.weapons[1]?.name],
    equippedWeapon2AttackBonus: [this.initialValues?.equippedInventory.weapons[1]?.attackBonus],
    equippedWeapon2DamageType: [this.initialValues?.equippedInventory.weapons[1]?.damage_type],
    equippedWeapon3Name: [this.initialValues?.equippedInventory.weapons[2]?.name],
    equippedWeapon3AttackBonus: [this.initialValues?.equippedInventory.weapons[2]?.attackBonus],
    equippedWeapon3DamageType: [this.initialValues?.equippedInventory.weapons[2]?.damage_type],
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
    this.abilityScoresForm.valueChanges.subscribe(() => {
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
      background: this.characterSheetForm.value.background || '',
      alignment: this.characterSheetForm.value.alignment || '',
      experiencePoints: this.characterSheetForm.value.experiencePoints || 0,
      inspiration: this.characterSheetForm.value.inspiration || 0,
      armorClass: this.characterSheetForm.value.armorClass || 0,
      equipment: this.characterSheetForm.value.equipment || '',
      otherProficienciesAndLanguages: this.characterSheetForm.value.otherProficienciesAndLanguages || '',
      equippedInventory: this.getEquippedInventory(),
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

    console.log(character);

    // this.#campaignsService.updatePlayerCharacter(character);
  }

  private getEquippedInventory(): IEquippedInventory {
    const equippedArmor: IArmor = {
      name: this.characterSheetForm.value.equippedArmorName || '',
      armorClass: this.characterSheetForm.value.equippedArmorClass || 0,
      maxBonus: this.characterSheetForm.value.equippedArmorMaxBonus || 0,
      notes: this.characterSheetForm.value.equippedArmorNotes || '',
      dexterityBonus: this.characterSheetForm.value.equippedArmorDexterityBonus || false
    }

    const equippedShield: IEquipment = {
      name: this.characterSheetForm.value.equippedShieldName || '',
      armorClassBonus: this.characterSheetForm.value.equippedShieldArmorClassBonus || 0,
      notes: this.characterSheetForm.value.equippedShieldNotes || ''
    }

    const equippedHelmet: IEquipment = {
      name: this.characterSheetForm.value.equippedHelmetName || '',
      armorClassBonus: this.characterSheetForm.value.equippedHelmetArmorClassBonus || 0,
      notes: this.characterSheetForm.value.equippedHelmetNotes || ''
    }

    const equippedRing1: IEquipment = {
      name: this.characterSheetForm.value.equippedRing1Name || '',
      armorClassBonus: this.characterSheetForm.value.equippedRing1ArmorClassBonus || 0,
      notes: this.characterSheetForm.value.equippedRing1Notes || ''
    }

    const equippedRing2: IEquipment = {
      name: this.characterSheetForm.value.equippedRing2Name || '',
      armorClassBonus: this.characterSheetForm.value.equippedRing2ArmorClassBonus || 0,
      notes: this.characterSheetForm.value.equippedRing2Notes || ''
    }

    const equippedCloak: IEquipment = {
      name: this.characterSheetForm.value.equippedCloakName || '',
      armorClassBonus: this.characterSheetForm.value.equippedCloakArmorClassBonus || 0,
      notes: this.characterSheetForm.value.equippedCloakNotes || ''
    }

    const equippedBoots: IEquipment = {
      name: this.characterSheetForm.value.equippedBootsName || '',
      armorClassBonus: this.characterSheetForm.value.equippedBootsArmorClassBonus || 0,
      notes: this.characterSheetForm.value.equippedBootsNotes || ''
    }

    const equippedGloves: IEquipment = {
      name: this.characterSheetForm.value.equippedGlovesName || '',
      armorClassBonus: this.characterSheetForm.value.equippedGlovesArmorClassBonus || 0,
      notes: this.characterSheetForm.value.equippedGlovesNotes || ''
    }

    const equippedNecklace: IEquipment = {
      name: this.characterSheetForm.value.equippedNecklaceName || '',
      armorClassBonus: this.characterSheetForm.value.equippedNecklaceArmorClassBonus || 0,
      notes: this.characterSheetForm.value.equippedNecklaceNotes || ''
    }

    const equippedWeapon1: IWeapon = {
      name: this.characterSheetForm.value.equippedWeapon1Name || '',
      attackBonus: this.characterSheetForm.value.equippedWeapon1AttackBonus || '',
      damage_type: this.characterSheetForm.value.equippedWeapon1DamageType || ''
    }

    const equippedWeapon2: IWeapon = {
      name: this.characterSheetForm.value.equippedWeapon2Name || '',
      attackBonus: this.characterSheetForm.value.equippedWeapon2AttackBonus || '',
      damage_type: this.characterSheetForm.value.equippedWeapon2DamageType || ''
    }

    const equippedWeapon3: IWeapon = {
      name: this.characterSheetForm.value.equippedWeapon3Name || '',
      attackBonus: this.characterSheetForm.value.equippedWeapon3AttackBonus || '',
      damage_type: this.characterSheetForm.value.equippedWeapon3DamageType || ''
    }

    return {
      armor: equippedArmor,
      shield: equippedShield,
      helmet: equippedHelmet,
      ring1: equippedRing1,
      ring2: equippedRing2,
      cloak: equippedCloak,
      boots: equippedBoots,
      gloves: equippedGloves,
      necklace: equippedNecklace,
      weapons: [equippedWeapon1, equippedWeapon2, equippedWeapon3]
    }
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
    let armorClass = this.characterSheetForm?.value.equippedArmorClass;
    let equippedArmorDexterityBonus = this.characterSheetForm?.value.equippedArmorDexterityBonus;
    let maxBonus = this.characterSheetForm?.value.equippedArmorMaxBonus;

    if (!armorClass) {
      return 10 + this.dexterityModifier() + this.otherItemsArmorBonus();
    }

    let modifiedArmorClass = Number(armorClass) + this.otherItemsArmorBonus();

    if (equippedArmorDexterityBonus) {
      let dexterityModifier = this.dexterityModifier();

      if (maxBonus && dexterityModifier > maxBonus) {
        dexterityModifier = maxBonus;
      }

      return modifiedArmorClass + Number(dexterityModifier);
    }

    return modifiedArmorClass;
  }

  private otherItemsArmorBonus(): number {
    let armorBonus = 0;
    armorBonus += Number(this.characterSheetForm?.value.equippedShieldArmorClassBonus) || 0;
    armorBonus += Number(this.characterSheetForm?.value.equippedHelmetArmorClassBonus) || 0;
    armorBonus += Number(this.characterSheetForm?.value.equippedRing1ArmorClassBonus) || 0;
    armorBonus += Number(this.characterSheetForm?.value.equippedRing2ArmorClassBonus) || 0;
    armorBonus += Number(this.characterSheetForm?.value.equippedCloakArmorClassBonus) || 0;
    armorBonus += Number(this.characterSheetForm?.value.equippedBootsArmorClassBonus) || 0;
    armorBonus += Number(this.characterSheetForm?.value.equippedGlovesArmorClassBonus) || 0;
    armorBonus += Number(this.characterSheetForm?.value.equippedNecklaceArmorClassBonus) || 0;

    return armorBonus;
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

  isMagicUser(): boolean {
    return this.initialValues?.className === 'Wizard'
      || this.initialValues?.className === 'Sorcerer'
      || this.initialValues?.className === 'Warlock'
      || this.initialValues?.className === 'Cleric'
      || this.initialValues?.className === 'Druid'
      || this.initialValues?.className === 'Paladin'
      || this.initialValues?.className === 'Ranger'
      || this.initialValues?.className === 'Bard';
  }

  protected readonly IMAGE_URL = IMAGE_URL;
}
