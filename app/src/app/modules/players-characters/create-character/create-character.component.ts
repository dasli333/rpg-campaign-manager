import {ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, OnInit, signal} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {
  AbstractControl,
  FormArray,
  FormBuilder, FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {Dnd5eApiService} from "../../../data-services/dnd5e-api.service";
import {Race, RaceReference, Subrace} from "../../../data-services/models/race";
import {RaceDetailsComponent} from "../race-details/race-details.component";
import {CharacterClass, CharacterClassReference} from "../../../data-services/models/character-class";
import {ClassDetailsComponent} from "../class-details/class-details.component";
import {PlayerCharacterDataService} from "../player-character-data.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDivider} from "@angular/material/divider";
import {exactSelectedCheckboxes} from "../../helpers/helpers";
import {NgClass, TitleCasePipe} from "@angular/common";
import {InfoTooltipComponent} from "../../helpers/info-tooltip/info-tooltip.component";
import {AbilityScoresSummaryComponent} from "../ability-scores-summary/ability-scores-summary.component";
import {Alignment} from "../../../data-services/models/alignment";
import {ImageUploadComponent} from "../../helpers/image-upload/image-upload.component";
import {
  ProficiencyType
} from "../../../data-services/models/proficiency";
import {MatExpansionModule} from "@angular/material/expansion";
import {CharacterSummaryComponent, CharacterSummaryData} from "./character-summary/character-summary.component";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {IProficiencies, PlayerCharacter} from "../interfaces/player-character";
import {CampaignsService} from "../../campaigns/campaigns.service";

enum AbilityScoreMode {
  DEFAULT,
  ROLLED,
  MANUAL
}

interface SkillsFormValues {
  [key: string]: boolean;
}

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [MatStepperModule,
    MatButton,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    RaceDetailsComponent,
    ClassDetailsComponent, MatDivider, TitleCasePipe, InfoTooltipComponent, AbilityScoresSummaryComponent, NgClass, ImageUploadComponent, CharacterSummaryComponent],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterComponent implements OnInit {

  #formBuilder = inject(FormBuilder);
  #dnd5eApiService = inject(Dnd5eApiService);
  #playerCharacterDataService = inject(PlayerCharacterDataService);
  #campaignService = inject(CampaignsService);
  #detectChanges = inject(ChangeDetectorRef);
  #defaultScores = [15, 14, 13, 12, 10, 8];


  #abilityScoresOrder = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  #alignmentOrder = ['lawful-good', 'neutral-good', 'chaotic-good', 'lawful-neutral', 'neutral', 'chaotic-neutral', 'lawful-evil', 'neutral-evil', 'chaotic-evil'];

  rolledScores: number[] = []
  races: RaceReference[] = [];
  traits = this.#playerCharacterDataService.traits;
  alignments = computed(() => {
    return [...this.#playerCharacterDataService.alignments()]
      .sort((keyA, keyB) => {
        return this.#alignmentOrder.indexOf(keyA.index) - this.#alignmentOrder.indexOf(keyB.index)
      });
  });
  abilityScoresInOrder = computed(() => {
    return [...this.#playerCharacterDataService.abilityScores()]
      .sort((keyA, keyB) => {
        return this.#abilityScoresOrder.indexOf(keyA.index) - this.#abilityScoresOrder.indexOf(keyB.index)
      });
  })
  defaultValuesMode = signal<AbilityScoreMode | null>(null);
  classes: CharacterClassReference[] = [];
  selectedSubrace: Subrace | undefined | null;
  selectedRaceDetail: Race | undefined;
  selectedClassDetail: CharacterClass | undefined;
  selectedAlignment: Alignment | undefined;
  selectedSkillsNames: string[] = [];
  selectedAbilityScores: Map<string, number | null> = new Map();
  selectedProficiencies = signal<string[]>([]);
  proficiencyChoices: any[] = [];
  imagePreview: string | ArrayBuffer | null | undefined = null;
  allAvailableProficiencies: { index: string, name: string, type: string }[] = []
  proficiencies = this.#playerCharacterDataService.proficiencies;

  artisansToolsProficiencies = computed(() => {
    const proficiencies = this.proficiencies().filter(proficiency => proficiency.type === ProficiencyType.ARTISANS_TOOLS);
    return proficiencies.filter(proficiency => !this.selectedProficiencies().includes(proficiency.index));
  });
  skillsProficiencies = computed(() => {
    const proficiencies = this.proficiencies().filter(proficiency => proficiency.type === ProficiencyType.SKILLS);
    return proficiencies.filter(proficiency => !this.selectedProficiencies().includes(proficiency.index));
  });
  musicalInstrumentsProficiencies = computed(() => {
    const proficiencies = this.proficiencies().filter(proficiency => proficiency.type === ProficiencyType.MUSICAL_INSTRUMENTS);
    return proficiencies.filter(proficiency => !this.selectedProficiencies().includes(proficiency.index));
  });
  gamingSetsProficiencies = computed(() => {
    const proficiencies = this.proficiencies().filter(proficiency => proficiency.type === ProficiencyType.GAMING_SETS);
    return proficiencies.filter(proficiency => !this.selectedProficiencies().includes(proficiency.index));
  });
  vehiclesProficiencies = computed(() => {
    const proficiencies = this.proficiencies().filter(proficiency => proficiency.type === ProficiencyType.VEHICLES);
    return proficiencies.filter(proficiency => !this.selectedProficiencies().includes(proficiency.index));
  });
  otherProficiencies = computed(() => {
    const proficiencies = this.proficiencies().filter(proficiency => proficiency.type === ProficiencyType.OTHER);
    return proficiencies.filter(proficiency => !this.selectedProficiencies().includes(proficiency.index));
  });

  languageChoices = this.#playerCharacterDataService.languages;
  characterImage: File | null = null;
  errorInAbilityScoreBonusForm = false;
  characterSummary: CharacterSummaryData | undefined;

  raceCharacterForm = this.#formBuilder.group({
    race: ['', Validators.required],
    subrace: [''],
  });

  classCharacterForm = this.#formBuilder.group({
    class: ['', Validators.required],
  });

  proficiencyCharacterForm = this.#formBuilder.group({
    proficiencies: this.buildProficienciesChoices()
  });

  abilityScoreCharacterForm = this.#formBuilder.group({
    str: [null as number | null, [Validators.required, Validators.min(3), Validators.max(18)]],
    dex: [null as number | null, [Validators.required, Validators.min(3), Validators.max(18)]],
    con: [null as number | null, [Validators.required, Validators.min(3), Validators.max(18)]],
    int: [null as number | null, [Validators.required, Validators.min(3), Validators.max(18)]],
    wis: [null as number | null, [Validators.required, Validators.min(3), Validators.max(18)]],
    cha: [null as number | null, [Validators.required, Validators.min(3), Validators.max(18)]]
  }, {validators: this.defaultValuesSelectedCorrectly()});


  characterDetailsForm = this.#formBuilder.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
    age: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    alignment: ['', Validators.required],
    image: ['', Validators.required],
  });

  personalCharacteristicsForm = this.#formBuilder.group({
    background: ['', Validators.required],
    personalityTraits: ['', Validators.required],
    ideals: ['', Validators.required],
    bonds: ['', Validators.required],
    flaws: ['', Validators.required],
  });

  backgroundSkillsForm = this.#formBuilder.group({
    skills: this.setControlForSkills(),
    proficiencies: this.setControlForProficiencies(),
  });

  get imageControl(): FormControl {
    return this.characterDetailsForm.get('image') as FormControl;
  }

  constructor() {
    this.#dnd5eApiService.getRaces().subscribe(races => {
      this.races = races.data.races;
    });

    this.#dnd5eApiService.getClasses().subscribe(classes => {
      this.classes = classes.data.classes;
    });

    this.#dnd5eApiService.getBackgroundChoiceProficiencies().subscribe(setOfSkills => {
      this.#playerCharacterDataService.setLanguages(setOfSkills.data.languages);
      this.#playerCharacterDataService.setProficiencies(setOfSkills.data.proficiencies);
      // this.updateProficiencies(setOfSkills.data.proficiencies);
      this.backgroundSkillsForm.setControl('skills', this.setControlForSkills());
      this.backgroundSkillsForm.setControl('proficiencies', this.setControlForProficiencies());
      // TODO: add equipment?
    });

    this.#dnd5eApiService.getWeaponsArmorAndSavingThrowsProficiencies().subscribe(proficiencies => {
      this.#playerCharacterDataService.setProficiencies(proficiencies.data.proficiencies);
    })
  }

  ngOnInit(): void {
    this.abilityScoreCharacterForm.disable();
  }

  onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 2) {
      this.proficiencyCharacterForm.setControl('proficiencies', this.buildProficienciesChoices());
    }

    if (event.selectedIndex === 6) {
      this.selectedProficiencies.set([]);
      this.proficiencyCharacterForm.value.proficiencies.forEach((proficiency: any[]) => {
        for (const key in proficiency) {
          if (proficiency[key]) {
            this.selectedProficiencies.update((proficiencies) => [...proficiencies, key]);
          }
        }
      });
      this.backgroundSkillsForm.reset();
    }

    if (event.selectedIndex === 7) {
      this.selectedSkillsNames = [];
      let selectedSkills: string[] = [];
      this.proficiencyCharacterForm.value.proficiencies.forEach((proficiency: any[]) => {
        for (const key in proficiency) {
          if (proficiency[key]) {
            selectedSkills.push(key);
          }
        }
      });

      console.log(this.backgroundSkillsForm.value);

      for (const key in this.backgroundSkillsForm.value.skills) {
        if ((this.backgroundSkillsForm.value.skills as SkillsFormValues)[key]) {
          selectedSkills.push(key);
        }
      }

      for (const key in this.backgroundSkillsForm.value.proficiencies) {
        if ((this.backgroundSkillsForm.value.proficiencies as SkillsFormValues)[key]) {
          selectedSkills.push(key);
        }
      }

      const raceStartingProficiencies = this.selectedRaceDetail?.starting_proficiencies?.map(proficiency => proficiency.index) || [];
      const subraceStartingProficiencies = this.selectedSubrace?.starting_proficiencies?.map(proficiency => proficiency.index) || [];
      const classProficiencies = this.selectedClassDetail?.proficiencies?.map(proficiency => proficiency.index) || [];

      selectedSkills = selectedSkills.concat(raceStartingProficiencies, subraceStartingProficiencies, classProficiencies);
      // TODO: fix (now it only display allAvailableProficiencies) - remember about languages
      this.selectedSkillsNames = this.allAvailableProficiencies.filter(proficiency => selectedSkills.includes(proficiency.index)).map(proficiency => proficiency.name + ' (' + proficiency.type + ')');


      const proficiencies: IProficiencies = {
        WEAPONS: [],
        ARTISANS_TOOLS: [],
        SKILLS: [],
        ARMOR: [],
        MUSICAL_INSTRUMENTS: [],
        SAVING_THROWS: [],
        OTHER: [],
        GAMING_SETS: [],
        VEHICLES: [],
        LANGUAGES: []
      }


      selectedSkills.forEach(skill => {
        const proficiency = this.proficiencies().find(proficiency => proficiency.index === skill);
        if (!proficiency) {
          const language = this.languageChoices().find(language => language.index === skill)?.name;
          if (language) {
            proficiencies.LANGUAGES.push(language);
          }
          return;
        }
        switch (proficiency.type) {
          case ProficiencyType.WEAPONS:
            proficiencies.WEAPONS.push(proficiency.name);
            break;
          case ProficiencyType.ARTISANS_TOOLS:
            proficiencies.ARTISANS_TOOLS.push(proficiency.name);
            break;
          case ProficiencyType.SKILLS:
            proficiencies.SKILLS.push(proficiency.name);
            break;
          case ProficiencyType.ARMOR:
            proficiencies.ARMOR.push(proficiency.name);
            break;
          case ProficiencyType.MUSICAL_INSTRUMENTS:
            proficiencies.MUSICAL_INSTRUMENTS.push(proficiency.name);
            break;
          case ProficiencyType.SAVING_THROWS:
            proficiencies.SAVING_THROWS.push(proficiency.name);
            break;
          case ProficiencyType.OTHER:
            proficiencies.OTHER.push(proficiency.name);
            break;
          case ProficiencyType.GAMING_SETS:
            proficiencies.GAMING_SETS.push(proficiency.name);
            break;
          case ProficiencyType.VEHICLES:
            proficiencies.VEHICLES.push(proficiency.name);
            break;
          case "LANGUAGES":
            proficiencies.LANGUAGES.push(proficiency.name);
            break;
        }
      });

      const raceTraitsNames = this.selectedRaceDetail?.traits.map(trait => trait.name) || [];
      const subraceTraitsNames = this.selectedSubrace?.racial_traits.map(trait => trait.name) || [];
      const traitsNames = raceTraitsNames.concat(subraceTraitsNames);

      this.characterSummary = {
        image: this.imagePreview || '',
        imageFile: this.characterImage,
        characterDetails: {
          name: this.characterDetailsForm.value.name || '',
          gender: this.characterDetailsForm.value.gender || '',
          age: Number(this.characterDetailsForm.value.age) || 0,
          height: this.characterDetailsForm.value.height || '',
          weight: this.characterDetailsForm.value.weight || '',
          alignment: this.characterDetailsForm.value.alignment || '',
          image: this.characterDetailsForm.value.image || '',
        },
        raceDetails: {
          race: this.selectedRaceDetail?.name || '',
          subrace: this.selectedSubrace?.name || '',
          traits: traitsNames
        },
        className: this.selectedClassDetail?.name || '',
        personalCharacteristics: {
          background: this.personalCharacteristicsForm.value.background || '',
          personalityTraits: this.personalCharacteristicsForm.value.personalityTraits || '',
          ideals: this.personalCharacteristicsForm.value.ideals || '',
          bonds: this.personalCharacteristicsForm.value.bonds || '',
          flaws: this.personalCharacteristicsForm.value.flaws || '',
        },
        abilityScores: {
          strength: this.selectedAbilityScores.get('str') || 0,
          dexterity: this.selectedAbilityScores.get('dex') || 0,
          constitution: this.selectedAbilityScores.get('con') || 0,
          intelligence: this.selectedAbilityScores.get('int') || 0,
          wisdom: this.selectedAbilityScores.get('wis') || 0,
          charisma: this.selectedAbilityScores.get('cha') || 0,
        },
        selectedSkills: this.selectedSkillsNames,
        proficiencies: proficiencies,
      }

      console.log(this.characterSummary)
    }
  }

  setImagePreview(image: string | ArrayBuffer | null | undefined) {
    this.imagePreview = image
  }

  setFinalAbilityScores(scores: Map<string, number | null>) {
    this.selectedAbilityScores = scores;
  }

  saveCharacter() {
    // TODO: save character
    if (!this.characterSummary) {
      return;
    }
    const playerCharacter = new PlayerCharacter(this.characterSummary)
    console.log(playerCharacter);
    this.#campaignService.addPlayerCharacter(playerCharacter).subscribe((value) => {
      console.log(value);
      this.#detectChanges.markForCheck();
    });
  }

  setControlForSkills() {
    let skills = this.skillsProficiencies();
    const formGroup = new FormGroup({}, exactSelectedCheckboxes(2));
    skills.forEach(skill => {
      this.allAvailableProficiencies.push({index: skill.index, name: skill.name, type: skill.type});
      formGroup.addControl(skill.index, this.#formBuilder.control(false));
    });
    return formGroup;
  }

  private getBackgroundProficiencies() {
    return this.proficiencies().filter(proficiency => proficiency.type === ProficiencyType.ARTISANS_TOOLS
      || proficiency.type === ProficiencyType.GAMING_SETS
      || proficiency.type === ProficiencyType.MUSICAL_INSTRUMENTS
      || proficiency.type === ProficiencyType.VEHICLES
      || proficiency.type === ProficiencyType.OTHER);
  }

  setControlForProficiencies() {
    const languages = this.languageChoices();
    const backgroundProficiencies = this.getBackgroundProficiencies();
    const formGroup = new FormGroup({}, exactSelectedCheckboxes(2));
    backgroundProficiencies.forEach(proficiency => {
      if (this.selectedProficiencies().includes(proficiency.index)) {
        return;
      }
      this.allAvailableProficiencies.push({index: proficiency.index, name: proficiency.name, type: proficiency.type});
      formGroup.addControl(proficiency.index, this.#formBuilder.control(false));
    });
    languages.forEach(language => {
      if (this.selectedProficiencies().includes(language.index)) {
        return;
      }
      this.allAvailableProficiencies.push({index: language.index, name: language.name, type: "LANGUAGES"});
      formGroup.addControl(language.index, this.#formBuilder.control(false));
    });
    return formGroup;
  }

  buildProficienciesChoices() {
    this.proficiencyChoices = [];
    const groups = new FormArray<any>([]);
    this.selectedClassDetail?.proficiency_choices.forEach(proficiency => {
      let group: FormGroup | null = new FormGroup({}, exactSelectedCheckboxes(proficiency.choose));
      proficiency.from.filteredOptions = proficiency.from.options.filter(option => {
        return !this.selectedProficiencies().includes(option.item?.index || '');
      });
      const proficiencyChoice = proficiency;
      proficiency.from.options.forEach(option => {
        if (option.item) {
          const controlName = option.item.index;
          (group as FormGroup).addControl(controlName, this.#formBuilder.control(false));
        } else if (option.choice) {
          group = null;
          const optionChoiceClone = structuredClone(option.choice);
          optionChoiceClone.desc = "Choose " + option.choice.choose + " from the following " + option.choice.desc;
          optionChoiceClone.from.filteredOptions = option.choice.from.options.filter(option => {
            return !this.selectedProficiencies().includes(option.item?.index || '');
          })
          this.proficiencyChoices.push(optionChoiceClone);
          const groupForChoice = new FormGroup({}, exactSelectedCheckboxes(option.choice.choose));
          option.choice.from.options.forEach(choice => {
            const controlName = choice.item?.index || '';
            groupForChoice.addControl(controlName, this.#formBuilder.control(false));
          })
          groups.push(groupForChoice);
        }
      });
      if (group) {
        this.proficiencyChoices.push(proficiencyChoice);
        groups.push(group);
      }
    });
    return groups;
  }

  onRaceChange(event: MatSelectChange) {
    const raceIndex = event.value
    if (!raceIndex) return;
    this.#dnd5eApiService.getRaceDetails(raceIndex).subscribe(raceDetail => {
      this.selectedRaceDetail = raceDetail.data.race;
      this.selectedProficiencies.set(this.selectedRaceDetail.starting_proficiencies.map(proficiency => proficiency.index));
      this.selectedSubrace = null;
      this.raceCharacterForm.get('subrace')?.reset();
      this.#detectChanges.markForCheck();
    })
  }

  onSubraceChange(event: MatSelectChange) {
    const subraceIndex = event.value;
    if (!subraceIndex && this.selectedRaceDetail) {
      this.selectedSubrace = null;
      this.selectedProficiencies.set(this.selectedRaceDetail.starting_proficiencies.map(proficiency => proficiency.index));
      return;
    }
    this.#dnd5eApiService.getSubraceDetails(subraceIndex).subscribe(subrace => {
      this.selectedSubrace = subrace.data.subrace;
      this.selectedProficiencies.update((proficiencies) => [...proficiencies, ...this.selectedSubrace?.starting_proficiencies.map(proficiency => proficiency.index) || []]);
      this.#detectChanges.markForCheck();
    })
  }

  onClassChange(event: MatSelectChange) {
    const classIndex = event.value;
    if (!classIndex) {
      return;
    }
    this.#dnd5eApiService.getClassDetails(classIndex).subscribe(classDetail => {
      this.selectedClassDetail = classDetail;
      this.#detectChanges.markForCheck();
    })
  }

  onAlignmentChange(event: MatSelectChange) {
    const alignmentIndex = event.value;

    if (!alignmentIndex) {
      return;
    }

    this.selectedAlignment = this.alignments().find(alignment => alignment.index === alignmentIndex);
  }

  setDefaultValues(): void {
    this.defaultValuesMode.set(AbilityScoreMode.DEFAULT);
    this.abilityScoreCharacterForm.setValue({
      str: 8, dex: 10, con: 12, int: 13, wis: 14, cha: 15
    });
  }

  rollValues(): void {
    this.defaultValuesMode.set(AbilityScoreMode.ROLLED);
    this.rolledScores = [];
    const dice = 6;
    const rolls = 4;
    this.abilityScoresInOrder().forEach(ability => {
      const diceRolls = [];
      for (let i = 0; i < rolls; i++) {
        const roll = Math.floor(Math.random() * dice) + 1;
        diceRolls.push(roll);
      }
      diceRolls.sort((a, b) => a - b);
      diceRolls.shift();
      const total = diceRolls.reduce((prev, next) => prev + next, 0);
      this.rolledScores.push(total);
      this.abilityScoreCharacterForm.controls[ability.index].setValue(total);
    });
  }

  setManualValues(): void {
    this.defaultValuesMode.set(AbilityScoreMode.MANUAL);
    this.abilityScoreCharacterForm.reset();
  }

  isErrorInAbilityScoreBonusForm(value: boolean) {
    this.errorInAbilityScoreBonusForm = value;
    this.#detectChanges.detectChanges();
  }

  enableAbilityScoreForm(): void {
    this.abilityScoreCharacterForm.enable();
  }

  resetValues(): void {
    this.abilityScoreCharacterForm.reset();
  }

  onFileSelected(file: File) {
    this.characterImage = file;
  }

  onRemoveImage() {
    this.characterDetailsForm.get('image')?.reset();
  }

  private defaultValuesSelectedCorrectly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.defaultValuesMode() === AbilityScoreMode.MANUAL) {
        return null;
      }

      const scores = this.defaultValuesMode() === AbilityScoreMode.DEFAULT ? this.#defaultScores : this.rolledScores;
      const group = control as FormGroup;
      const formValues = Object.values(group.controls).map(control => control.value);
      const scoreCounts = scores.reduce((counts, score) => {
        counts[score] = (counts[score] || 0) + 1;
        return counts;
      }, {} as Record<number, number>);

      for (const value of formValues) {
        if (scoreCounts[value]) {
          scoreCounts[value]--;
        } else {
          return {defaultValuesSelectedIncorrectly: true};
        }
      }

      for (const count of Object.values(scoreCounts)) {
        if (count !== 0) {
          return {defaultValuesSelectedIncorrectly: true};
        }
      }

      return null;
    };
  }

  protected readonly AbilityScoreMode = AbilityScoreMode;
}
