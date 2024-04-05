import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCharacterComponent {

}
