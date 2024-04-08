import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Race, Subrace} from "../../../data-services/models/race";

@Component({
  selector: 'app-race-details',
  standalone: true,
  imports: [],
  templateUrl: './race-details.component.html',
  styleUrl: './race-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceDetailsComponent {

  @Input() selectedRaceDetail: Race | undefined;
  @Input() selectedSubrace: Subrace | undefined | null;

}
