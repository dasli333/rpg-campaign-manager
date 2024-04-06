import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [MatStepperModule, MatButton, ReactiveFormsModule, MatFormFieldModule, MatInput, MatRadioModule],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterComponent {

  #formBuilder = inject(FormBuilder);

  nameCharacterForm = this.#formBuilder.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
    // race: ['', Validators.required],
  });


}
