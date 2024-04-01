import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {StoryLog} from "../interface/story-log";
import {CampaignsService} from "../../campaigns/campaigns.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";

@Component({
  selector: 'app-story-log-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './story-log-dialog.component.html',
  styleUrl: './story-log-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryLogDialogComponent {

  #formBuilder = inject(FormBuilder);
  #campaignService = inject(CampaignsService);


  addStoryLogForm = this.#formBuilder.group({
    entry: ''
  });

  // TODO: Close dialog only on cancel or submit

  addStoryLog() {
    if (!this.addStoryLogForm.value.entry) return;
    const storyLog: StoryLog = {entry: this.addStoryLogForm.value.entry}
    this.#campaignService.addStoryLog(storyLog).subscribe();
    this.addStoryLogForm.reset();
    // TODO: Close dialog
  }
}
