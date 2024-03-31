import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CampaignsService} from "../campaigns/campaigns.service";
import {StoryLog} from "./interface/story-log";
import {StoryLogItemComponent} from "./story-log-item/story-log-item.component";

@Component({
  selector: 'app-story-log',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInput, MatButton, StoryLogItemComponent],
  templateUrl: './story-log.component.html',
  styleUrl: './story-log.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryLogComponent {

  #campaignService = inject(CampaignsService);

  #formBuilder = inject(FormBuilder);

  addStoryLogForm = this.#formBuilder.group({
    entry: ''
  });

  storyLogs = this.#campaignService.storyLogs;

  addStoryLog() {
    if (!this.addStoryLogForm.value.entry) return;
    const storyLog: StoryLog = {entry: this.addStoryLogForm.value.entry}
    this.#campaignService.addStoryLog(storyLog).subscribe();
    this.addStoryLogForm.reset();
  }

}
