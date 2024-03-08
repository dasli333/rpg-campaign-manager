import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./services/login.service";

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
  #loginService = inject(LoginService);

  loginForm = this.#formBuilder.group({
    username: '',
    password: ''
  })

  onSubmit() {
    console.log(this.loginForm.value);
    this.#loginService.login();
  }
}
