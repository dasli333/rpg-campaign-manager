import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Race, Subrace} from "../../../data-services/models/race";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatListItemAvatar, MatListModule} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {InfoTooltipComponent} from "../../helpers/info-tooltip/info-tooltip.component";
import {Trait} from "../../../data-services/models/trait";

@Component({
  selector: 'app-race-details',
  standalone: true,
  imports: [MatCardModule, MatButton, MatDivider, MatListModule, MatListItem, MatIcon, NgIf, NgForOf, InfoTooltipComponent],
  templateUrl: './race-details.component.html',
  styleUrl: './race-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceDetailsComponent {

  @Input() selectedRaceDetail: Race | undefined;
  @Input() selectedSubrace: Subrace | undefined | null;
  @Input() traits: Trait[] = [];

  getTraitDescription(traitIndex: string) {
    return this.traits.find(trait => trait.index === traitIndex)?.desc[0];
  }

}
