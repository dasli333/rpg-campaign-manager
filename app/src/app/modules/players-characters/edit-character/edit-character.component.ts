import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
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
  strengthModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.strength || 0));
  dexterityModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.dexterity || 0));
  constitutionModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.constitution || 0));
  intelligenceModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.intelligence || 0));
  wisdomModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.wisdom || 0));
  charismaModifier = signal(this.getAbilityModifier(this.initialValues?.attributes?.charisma || 0));
  proficiencyBonus = signal(this.getProficiencyBonus());

  getRaceName(): string {
    const subrace = this.initialValues?.subrace;

    if (subrace) {
      return `${this.initialValues?.race} (${subrace})`;
    } else {
      return this.initialValues?.race || '';
    }
  }

  getAbilityModifier(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2);
  }

  displayModifier(modifier: number): string {
    if (modifier >= 0) {
      return `+${modifier}`;
    } else {
      return `${modifier}`;
    }
  }

  getProficiencyBonus(): number {
    if (!this.initialValues) return 0;
    return Math.ceil(this.initialValues.level / 4) + 1;
  }
}
