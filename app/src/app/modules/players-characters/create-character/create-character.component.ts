import {ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, OnInit, signal} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
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
import {TitleCasePipe} from "@angular/common";
import {InfoTooltipComponent} from "../../helpers/info-tooltip/info-tooltip.component";
import {AbilityScoresSummaryComponent} from "../ability-scores-summary/ability-scores-summary.component";
import {Alignment} from "../../../data-services/models/alignment";

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
    RaceDetailsComponent,
    ClassDetailsComponent, MatDivider, TitleCasePipe, InfoTooltipComponent, AbilityScoresSummaryComponent],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterComponent implements OnInit {

  #formBuilder = inject(FormBuilder);
  #dnd5eApiService = inject(Dnd5eApiService);
  #playerCharacterDaraService = inject(PlayerCharacterDataService);
  #detectChanges = inject(ChangeDetectorRef);
  #defaultScores = [15, 14, 13, 12, 10, 8];

  #abilityScoresOrder = ['str', 'dex', 'con', 'int', 'wis', 'cha'];


  rolledScores: number[] = []
  races: RaceReference[] = [];
  traits = this.#playerCharacterDaraService.traits;
  alignments = this.#playerCharacterDaraService.alignments;
  abilityScoresInOrder = computed(() => {
    return [...this.#playerCharacterDaraService.abilityScores()]
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
  errorInAbilityScoreBonusForm = false;

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
    alignment: ['', Validators.required],
  });


  constructor() {
    this.#dnd5eApiService.getRaces().subscribe(races => {
      this.races = races.data.races;
    });

    this.#dnd5eApiService.getClasses().subscribe(classes => {
      this.classes = classes.data.classes;
    });
  }

  ngOnInit(): void {
    this.abilityScoreCharacterForm.disable();
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
