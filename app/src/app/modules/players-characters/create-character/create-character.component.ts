import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
import {Dnd5eApiService} from "../../../data-services/dnd5e-api.service";
import {Race, RaceReference, Subrace} from "../../../data-services/models/race";

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
  #dnd5eApiService = inject(Dnd5eApiService);
  #detectChanges = inject(ChangeDetectorRef);

  races: RaceReference[] = [];
  selectedSubrace: Subrace | null = null;
  selectedRaceDetail: Race | undefined;
  // mainRace: Race | undefined;


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
    this.#dnd5eApiService.getRaces().subscribe(races => {
      this.races = races.results;
    });
  }

  onRaceChange(event: MatSelectChange) {
    const raceUrl = event.value
    if (!raceUrl) return;
    this.#dnd5eApiService.getRaceDetails<Race>(raceUrl).subscribe(raceDetail => {
      this.selectedRaceDetail = raceDetail;
      this.selectedSubrace = null;
      this.raceCharacterForm.get('subrace')?.reset();
      this.#detectChanges.markForCheck();
    })
  }

  onSubraceChange(event: MatSelectChange) {
    const subraceUrl = event.value;
    if (!subraceUrl) {
      this.selectedSubrace = null;
      return;
    }
    this.#dnd5eApiService.getRaceDetails<Subrace>(subraceUrl).subscribe(subrace => {
      this.selectedSubrace = subrace;
      this.#detectChanges.markForCheck();
    })
  }

}
