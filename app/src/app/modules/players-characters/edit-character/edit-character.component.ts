import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {CampaignsService} from "../../campaigns/campaigns.service";
import {MatButton} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-edit-character',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatCardModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatCheckbox,
    MatGridListModule,
    NgClass
  ],
  templateUrl: './edit-character.component.html',
  styleUrl: './edit-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCharacterComponent {

  #campaignsService = inject(CampaignsService);
  #route = inject(ActivatedRoute);

  characterId = this.#route.snapshot.paramMap.get('id') || '';
  playerCharacter = this.#campaignsService.getPlayerCharacterById(this.characterId);


  initialValues = this.playerCharacter();

  getRaceName(): string {
    const subrace = this.initialValues?.subrace;

    if (subrace) {
      return `${this.initialValues?.race} (${subrace})`;
    } else {
      return this.initialValues?.race || '';
    }
  }
}
