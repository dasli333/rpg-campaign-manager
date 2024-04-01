import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CampaignsService} from "../campaigns/campaigns.service";
import {StoryLogItemComponent} from "./story-log-item/story-log-item.component";
import {MatDialog} from "@angular/material/dialog";
import {StoryLogDialogComponent} from "./story-log-dialog/story-log-dialog.component";

@Component({
  selector: 'app-story-log',
  standalone: true,
  imports: [ReactiveFormsModule, MatInput, MatButton, StoryLogItemComponent],
  templateUrl: './story-log.component.html',
  styleUrl: './story-log.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryLogComponent {

  #campaignService = inject(CampaignsService);
  #dialog = inject(MatDialog);

  storyLogs = this.#campaignService.storyLogs;

  openStoryLogDialog() {
    this.#dialog.open(StoryLogDialogComponent, {width: '600px'})
  }
}
