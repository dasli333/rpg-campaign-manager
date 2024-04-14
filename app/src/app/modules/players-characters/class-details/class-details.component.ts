import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CharacterClass} from "../../../data-services/models/character-class";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-class-details',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatLine, MatDivider],
  templateUrl: './class-details.component.html',
  styleUrl: './class-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassDetailsComponent {

  @Input({required: true}) selectedClassDetail: CharacterClass | undefined;

}
