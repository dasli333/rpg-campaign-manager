import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {RACES_PL} from "../../../../dnd-data/race/race_pl";
import {Race} from "../../../../dnd-data/race/race";

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [MatStepperModule, MatButton, ReactiveFormsModule, MatFormFieldModule, MatInput, MatRadioModule, MatSelectModule],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterComponent {

  #formBuilder = inject(FormBuilder);

  races = RACES_PL;

  selectedRace: Race | undefined;
  mainRace: Race | undefined;


  raceCharacterForm = this.#formBuilder.group({
    race: ['', Validators.required],
    subrace: [''],
  });

  nameCharacterForm = this.#formBuilder.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
    // race: ['', Validators.required],
  });

  constructor() {
    this.raceCharacterForm.get('race')?.valueChanges.subscribe(raceId => {
      this.selectedRace = this.races.find(race => race.id === raceId);
      this.mainRace = this.selectedRace;
    })

    this.raceCharacterForm.get('subrace')?.valueChanges.subscribe(subraceId => {
      this.selectedRace = this.mainRace?.subrace?.find(race => race.id === subraceId);
    })
  }


}
