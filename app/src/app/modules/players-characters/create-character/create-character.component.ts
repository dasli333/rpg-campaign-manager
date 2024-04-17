import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
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
    RaceDetailsComponent,
    ClassDetailsComponent, MatDivider],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterComponent {

  #formBuilder = inject(FormBuilder);
  #dnd5eApiService = inject(Dnd5eApiService);
  #playerCharacterDaraService = inject(PlayerCharacterDataService);
  #detectChanges = inject(ChangeDetectorRef);

  races: RaceReference[] = [];
  traits = this.#playerCharacterDaraService.traits;
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

  onProficiencyChange(event: MatSelectChange) {
    // TODO: Implement this method
    const proficiencyIndex = event.value;
    if (!proficiencyIndex) {
      return;
    }
    this.#playerCharacterDaraService.setProficiencies([...this.#playerCharacterDaraService.proficiencies(), proficiencyIndex]);
  }

}
