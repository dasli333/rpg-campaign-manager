import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {AbilityBonus, AbilityBonusOptions} from "../../../data-services/models/ability-score";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDivider} from "@angular/material/divider";
import {exactSelectedCheckboxes} from "../../helpers/helpers";
import {MatError} from "@angular/material/form-field";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-ability-scores-summary',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, MatDivider, ReactiveFormsModule, MatError],
  templateUrl: './ability-scores-summary.component.html',
  styleUrl: './ability-scores-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbilityScoresSummaryComponent {

  constructor() {
    this.raceChoiceBonusForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.checkFormsErrors();
    });

    this.subraceChoiceBonusForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.checkFormsErrors();
    });
  }

  @Input() set abilityScores(abilityScores: { [key: string]: number | null }) {
    this.getAbilityScores = new Map(Object.entries(abilityScores));
  }

  @Input() set setRaceChoiceBonuses(raceChoiceBonuses: AbilityBonusOptions | undefined) {
    this.raceChoiceBonuses = raceChoiceBonuses;
    this.raceChoiceBonusForm.setControl('raceBonus', this.buildAbilityScoreOptions(true));
  }

  @Input() set setSubraceChoiceBonuses(subraceChoiceBonuses: AbilityBonusOptions | undefined) {
    this.subraceChoiceBonuses = subraceChoiceBonuses;
    this.subraceChoiceBonusForm.setControl('subraceBonus', this.buildAbilityScoreOptions(false));
  }

  @Input() set setRaceBonuses(raceBonuses: AbilityBonus[] | undefined) {
    if (raceBonuses) {
      this.raceBonuses = raceBonuses;
    }
  }

  @Input() set setSubraceBonuses(subraceBonuses: AbilityBonus[] | undefined) {
    if (subraceBonuses) {
      this.subraceBonuses = subraceBonuses;
    }
  };

  @Output() isErrorInForm = new EventEmitter<boolean>()


  #formBuilder = inject(FormBuilder);

  raceBonuses: AbilityBonus[] = [];
  subraceBonuses: AbilityBonus[] = [];
  raceChoiceBonuses: AbilityBonusOptions | undefined;
  subraceChoiceBonuses: AbilityBonusOptions | undefined;
  getAbilityScores: Map<string, number | null> = new Map();

  raceChoiceBonusForm = this.#formBuilder.group({
    raceBonus: this.buildAbilityScoreOptions(true)
  });

  subraceChoiceBonusForm = this.#formBuilder.group({
    subraceBonus: this.buildAbilityScoreOptions(false)
  });


  getFinalAbilityScore(abilityScoreIndex: string, abilityValue: number | null): string {
    let bonusModifier = 0;
    this.raceBonuses.forEach(bonus => {
      if (bonus.ability_score.index === abilityScoreIndex) {
        bonusModifier += bonus.bonus;
      }
    });
    this.subraceBonuses.forEach(bonus => {
      if (bonus.ability_score.index === abilityScoreIndex) {
        bonusModifier += bonus.bonus;
      }
    });


    const finalValue = abilityValue ? abilityValue + bonusModifier : null;
    return abilityValue ? abilityScoreIndex.toUpperCase() + " " + finalValue : 'N/A';
  }

  buildAbilityScoreOptions(isMainRace: boolean) {
    const options = isMainRace ? this.raceChoiceBonuses?.from.options : this.subraceChoiceBonuses?.from.options;
    const optionsFormGroup = new FormGroup({}, exactSelectedCheckboxes(this.raceChoiceBonuses?.choose || 0));
    options?.forEach((option, index) => {
      const controlName = option.ability_score.index;
      optionsFormGroup.addControl(controlName, this.#formBuilder.control(false));
    });
    return optionsFormGroup;
  }

  private checkFormsErrors() {
    if (this.raceChoiceBonuses && this.subraceChoiceBonuses) {
      this.isErrorInForm.emit(this.raceChoiceBonusForm.invalid || this.subraceChoiceBonusForm.invalid);
    } else if (this.raceChoiceBonuses) {
      this.isErrorInForm.emit(this.raceChoiceBonusForm.invalid);
    } else if (this.subraceChoiceBonuses) {
      this.isErrorInForm.emit(this.subraceChoiceBonusForm.invalid);
    }
  }

}
