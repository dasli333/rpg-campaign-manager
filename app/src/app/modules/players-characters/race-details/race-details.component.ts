import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Race, Subrace} from "../../../data-services/models/race";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatListItemAvatar, MatListModule} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-race-details',
  standalone: true,
  imports: [MatCardModule, MatButton, MatDivider, MatListModule, MatListItem, MatIcon, NgIf, NgForOf],
  templateUrl: './race-details.component.html',
  styleUrl: './race-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceDetailsComponent {

  @Input() selectedRaceDetail: Race | undefined;
  @Input() selectedSubrace: Subrace | undefined | null;

}
