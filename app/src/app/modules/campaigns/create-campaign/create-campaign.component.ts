import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelectModule} from '@angular/material/select';
import {GameSystem} from "../enums/game-system";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CampaignsService} from "../campaigns.service";
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {ICampaign} from "../interfaces/campaign";
import {switchMap, tap} from "rxjs";


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
export class CreateCampaignComponent implements OnInit {

  campaignId: string | null = null;
  imagePreview: string | ArrayBuffer | null | undefined = null;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #campaignsService = inject(CampaignsService);
  #changeDetectorRef = inject(ChangeDetectorRef);

  formBuilder = new FormBuilder();
  selectedFile: File | null = null;
  gameSystems = Object.values(GameSystem);
  createCampaignForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: '',
    gameSystem: ['', Validators.required],
    image: [''],
  });

  ngOnInit(): void {
    this.campaignId = this.#route.snapshot.paramMap.get('id');

    if (this.campaignId) {
      this.#campaignsService.getCampaignById(this.campaignId).subscribe(campaign => {
        if (campaign) {
          this.createCampaignForm.patchValue({
            title: campaign.title,
            description: campaign.description,
            gameSystem: campaign.gameSystem,
          });
          this.imagePreview = campaign.image;
        }
      });
    }
  }

  onCreateCampaignSubmit() {
    if (this.campaignId) {
      this.updateCampaign();
    } else {
      this.createCampaign();
    }
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.#changeDetectorRef.markForCheck();
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onRemoveImage() {
    this.createCampaignForm.get('image')?.reset();
    this.imagePreview = null;
  }

  private updateCampaign() {
    const formValue = this.createCampaignForm.value;

    const campaign: ICampaign = {
      id: this.campaignId as string,
      title: formValue.title as string,
      description: formValue.description || undefined,
      gameSystem: formValue.gameSystem as GameSystem,
      image: formValue.image || undefined,
      storyLogs: [],
    };

    this.#campaignsService.editCampaign(campaign).subscribe(() => {
      this.#router.navigate(['/campaigns']);
    });
  }

  private createCampaign() {
    const formValue = this.createCampaignForm.value;

    const formData = new FormData();
    formData.append('title', formValue.title || '');
    formData.append('description', formValue.description || '');
    formData.append('gameSystem', formValue.gameSystem || '');
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }


    this.#campaignsService.createCampaign(formData).pipe(
      tap(campaign => {
        this.#campaignsService.addCampaign(campaign);
      }),
      switchMap(campaign => {
        return this.#campaignsService.setActiveCampaign(campaign.id);
      })
    ).subscribe(() => {
      this.#router.navigate(['/dashboard']);
    });
  }
}
