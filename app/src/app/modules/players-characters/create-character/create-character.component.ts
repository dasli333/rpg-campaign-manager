import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal} from '@angular/core';
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
    ClassDetailsComponent, MatDivider, TitleCasePipe, InfoTooltipComponent],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterComponent {

  #formBuilder = inject(FormBuilder);
  #dnd5eApiService = inject(Dnd5eApiService);
  #playerCharacterDaraService = inject(PlayerCharacterDataService);
  #detectChanges = inject(ChangeDetectorRef);
  #defaultScores = [15, 14, 13, 12, 10, 8];

  rolledScores: number[] = []
  races: RaceReference[] = [];
  traits = this.#playerCharacterDaraService.traits;
  abilityScores = this.#playerCharacterDaraService.abilityScores;
  defaultValuesMode = signal(false);
  classes: CharacterClassReference[] = [];
  selectedSubrace: Subrace | undefined | null;
  selectedRaceDetail: Race | undefined;
  selectedClassDetail: CharacterClass | undefined;
  proficiencyChoices: any[] = [];


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
    str: [3, [Validators.required, Validators.min(3), Validators.max(18)]],
    dex: [3, [Validators.required, Validators.min(3), Validators.max(18)]],
    con: [3, [Validators.required, Validators.min(3), Validators.max(18)]],
    int: [3, [Validators.required, Validators.min(3), Validators.max(18)]],
    wis: [3, [Validators.required, Validators.min(3), Validators.max(18)]],
    cha: [3, [Validators.required, Validators.min(3), Validators.max(18)]]
  }, {validators: this.defaultValuesSelectedCorrectly()});


  nameCharacterForm = this.#formBuilder.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
  });



  constructor() {
    this.#dnd5eApiService.getRaces().subscribe(races => {
      this.races = races.data.races;
    });

    this.#dnd5eApiService.getClasses().subscribe(classes => {
      this.classes = classes.data.classes;
    });
  }



  buildProficienciesChoices(){
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

  setDefaultValues(): void {
    this.defaultValuesMode.set(true);
    this.abilityScoreCharacterForm.setValue({
      str: 8, dex: 10, con: 12, int: 13, wis: 14, cha: 15
    });
  }

  rollValues(): void {
    this.defaultValuesMode.set(false);
    this.rolledScores = [];
    const dice = 6;
    const rolls = 4;
    this.abilityScores().forEach(ability => {
      const  diceRolls = [];
      for (let i = 0; i < rolls; i++) {
        const roll = Math.floor(Math.random() * dice) + 1;
        console.log(roll);
        diceRolls.push(roll);
      }
      diceRolls.sort((a, b) => a - b);
      diceRolls.shift();
      const total = diceRolls.reduce((prev, next) => prev + next, 0);
      this.rolledScores.push(total);
      this.abilityScoreCharacterForm.controls[ability.index].setValue(total);
      // const rolledValue = Math.floor(Math.random() * (18 - 3 + 1)) + 3; // Random number between 3 and 18
    });
  }

  private defaultValuesSelectedCorrectly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const scores = this.defaultValuesMode() ? this.#defaultScores : this.rolledScores;
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
          return { defaultValuesSelectedIncorrectly: true };
        }
      }

      for (const count of Object.values(scoreCounts)) {
        if (count !== 0) {
          return { defaultValuesSelectedIncorrectly: true };
        }
      }

      return null;
    };
  }

  resetValues(): void {
    this.abilityScoreCharacterForm.reset();
  }
}
