import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {AbilityBonus, AbilityBonusOptions} from "../../../data-services/models/ability-score";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-ability-scores-summary',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, MatDivider, ReactiveFormsModule],
  templateUrl: './ability-scores-summary.component.html',
  styleUrl: './ability-scores-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbilityScoresSummaryComponent {

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
    const optionsFormGroup = new FormGroup({});
    options?.forEach((option, index) => {
      const controlName = option.ability_score.index;
      optionsFormGroup.addControl(controlName, this.#formBuilder.control(false));
    });
    return optionsFormGroup;
  }

}
