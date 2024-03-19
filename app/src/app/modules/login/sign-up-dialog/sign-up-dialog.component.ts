import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user";

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

  #authService = inject(AuthService);
  #dialogRef = inject(MatDialogRef<SignUpDialogComponent>);
  formBuilder = new FormBuilder();


  signUpForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor() {}

  onSubmit() {
    if (this.signUpForm.valid) {
      const user= new User(
        this.signUpForm.value.username ?? '',
        this.signUpForm.value.email ?? '',
        this.signUpForm.value.password ?? ''
      );
      this.#authService.createUser(user);
      this.#dialogRef.close();
    }
  }
}
