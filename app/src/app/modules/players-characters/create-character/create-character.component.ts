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
  ProficiencyDetail,
  ProficiencyType
} from "../../../data-services/models/proficiency";
import {MatExpansionModule} from "@angular/material/expansion";
import {CharacterSummaryComponent, CharacterSummaryData} from "./character-summary/character-summary.component";
import {StepperSelectionEvent} from "@angular/cdk/stepper";

enum AbilityScoreMode {
  DEFAULT,
  ROLLED,
  MANUAL
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
  proficiencyChoices: any[] = [];
  proficiencies = this.#playerCharacterDataService.proficiencies;
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
      this.updateProficiencies(setOfSkills.data.proficiencies);
      this.backgroundSkillsForm.setControl('skills', this.setControlForSkills());
      this.backgroundSkillsForm.setControl('proficiencies', this.setControlForProficiencies());
      // TODO: add equipment?
    });
  }

  ngOnInit(): void {
    this.abilityScoreCharacterForm.disable();
  }

  onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 7) {
      const proficiencies = this.proficiencyChoices
      // TODO: set proficiencies
      // const backgroundProficiencies = this.backgroundSkillsForm.value.proficiencies;
      // const skills = this.backgroundSkillsForm.value.skills;
      this.characterSummary = {
        image: this.imageControl.value,
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
          strength: this.abilityScoreCharacterForm.value.str || 0,
          dexterity: this.abilityScoreCharacterForm.value.dex || 0,
          constitution: this.abilityScoreCharacterForm.value.con || 0,
          intelligence: this.abilityScoreCharacterForm.value.int || 0,
          wisdom: this.abilityScoreCharacterForm.value.wis || 0,
          charisma: this.abilityScoreCharacterForm.value.cha || 0,
        },
        selectedSkills: proficiencies
      }

      console.log(this.characterSummary)
    }
  }


  setControlForSkills() {
    const skills = this.#playerCharacterDataService.proficiencies().SKILLS;
    const formGroup = new FormGroup({}, exactSelectedCheckboxes(2));
    skills.forEach(skill => {
      formGroup.addControl(skill.index, this.#formBuilder.control(false));
    });
    return formGroup;
  }

  setControlForProficiencies() {
    const proficiencies = this.#playerCharacterDataService.proficiencies();
    const languages = this.languageChoices();
    const backgroundProficiencies = proficiencies.ARTISANS_TOOLS.concat(proficiencies.GAMING_SETS, proficiencies.MUSICAL_INSTRUMENTS, proficiencies.VEHICLES, proficiencies.OTHER);
    const formGroup = new FormGroup({}, exactSelectedCheckboxes(2));
    backgroundProficiencies.forEach(proficiency => {
      formGroup.addControl(proficiency.index, this.#formBuilder.control(false));
    });
    languages.forEach(language => {
      formGroup.addControl(language.index, this.#formBuilder.control(false));
    });
    return formGroup;
  }

  buildProficienciesChoices() {
    this.proficiencyChoices = [];
    const groups = new FormArray<any>([]);
    this.selectedClassDetail?.proficiency_choices.forEach(proficiency => {
      let group: FormGroup | null = new FormGroup({}, exactSelectedCheckboxes(proficiency.choose));
      const proficiencyChoice = proficiency;
      proficiency.from.options.forEach(option => {
        if (option.item) {
          const controlName = option.item.index;
          (group as FormGroup).addControl(controlName, this.#formBuilder.control(false));
        } else if (option.choice) {
          group = null;
          const optionChoiceClone = structuredClone(option.choice);
          optionChoiceClone.desc = "Choose " + option.choice.choose + " from the following " + option.choice.desc;
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
      this.selectedSubrace = null;
      this.raceCharacterForm.get('subrace')?.reset();
      this.#detectChanges.markForCheck();
    })
  }

  onSubraceChange(event: MatSelectChange) {
    const subraceIndex = event.value;
    if (!subraceIndex) {
      this.selectedSubrace = null;
      return;
    }
    this.#dnd5eApiService.getSubraceDetails(subraceIndex).subscribe(subrace => {
      this.selectedSubrace = subrace.data.subrace;
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
      this.proficiencyCharacterForm.setControl('proficiencies', this.buildProficienciesChoices());
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

  private updateProficiencies(proficiencies: ProficiencyDetail[]) {
    const skills = proficiencies.filter(proficiency => proficiency.type === ProficiencyType.SKILLS);
    const artisansTools = proficiencies.filter(proficiency => proficiency.type === ProficiencyType.ARTISANS_TOOLS);
    const vehicles = proficiencies.filter(proficiency => proficiency.type === ProficiencyType.VEHICLES);
    const gamingSets = proficiencies.filter(proficiency => proficiency.type === ProficiencyType.GAMING_SETS);
    const musicalInstruments = proficiencies.filter(proficiency => proficiency.type === ProficiencyType.MUSICAL_INSTRUMENTS);
    const other = proficiencies.filter(proficiency => proficiency.type === ProficiencyType.OTHER);

    this.#playerCharacterDataService.updateProficiencyType(ProficiencyType.SKILLS, skills);
    this.#playerCharacterDataService.updateProficiencyType(ProficiencyType.ARTISANS_TOOLS, artisansTools);
    this.#playerCharacterDataService.updateProficiencyType(ProficiencyType.VEHICLES, vehicles);
    this.#playerCharacterDataService.updateProficiencyType(ProficiencyType.GAMING_SETS, gamingSets);
    this.#playerCharacterDataService.updateProficiencyType(ProficiencyType.MUSICAL_INSTRUMENTS, musicalInstruments);
    this.#playerCharacterDataService.updateProficiencyType(ProficiencyType.OTHER, other);
  }

  protected readonly AbilityScoreMode = AbilityScoreMode;
}
