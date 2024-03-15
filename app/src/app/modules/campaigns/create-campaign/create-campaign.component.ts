import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {GameSystem} from "../enums/game-system";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CampaignsService} from "../campaigns.service";
import {Campaign} from "../interfaces/campaign";
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [
    MatButton,
    MatFormFieldModule,
    RouterLink,
    MatInput,
    MatSelectModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatIcon,
    NgStyle,
    NgClass
  ],
  templateUrl: './create-campaign.component.html',
  styleUrl: './create-campaign.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCampaignComponent {

  imagePreview: string | ArrayBuffer | null = null;

  #campaignsService = inject(CampaignsService);
  #changeDetectorRef = inject(ChangeDetectorRef);

  formBuilder = new FormBuilder();
  gameSystems = Object.values(GameSystem);
  createCampaignForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: '',
    gameSystem: ['', Validators.required],
    image: [''],
  });

  onCreateCampaignSubmit() {
    const formValue = this.createCampaignForm.value;
    const campaign: Campaign = {
      id: Math.random().toString(36).slice(2, 9),
      title: formValue.title as string,
      description: formValue.description || undefined,
      gameSystem: formValue.gameSystem as GameSystem,
      image: formValue.image || undefined,
      startDate: new Date(),
    };
    this.#campaignsService.createCampaign(campaign);
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.#changeDetectorRef.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  onRemoveImage() {
    this.createCampaignForm.patchValue({image: ''});
    this.imagePreview = null;
  }
}
