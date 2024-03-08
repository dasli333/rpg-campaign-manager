import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);

  loginForm = this.#formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit() {
    console.log(this.loginForm.value);
    this.#authService.login();
  }
}
