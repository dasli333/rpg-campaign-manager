import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {SignUpDialogComponent} from "./sign-up-dialog/sign-up-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatButton,
    MatFormFieldModule,
    MatInput
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  #dialog = inject(MatDialog);

  loginForm = this.#formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit() {
    this.#authService.login();
  }

  openRegister() {
    this.#dialog.open(SignUpDialogComponent, {width: '300px'})
  }
}
