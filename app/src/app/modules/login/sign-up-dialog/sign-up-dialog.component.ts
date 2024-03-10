import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-sign-up-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatDialogContent,
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatDialogActions
  ],
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpDialogComponent {
  formBuilder = new FormBuilder();

  signUpForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  onSubmit() {
    console.log(this.signUpForm.value);
  }
}
