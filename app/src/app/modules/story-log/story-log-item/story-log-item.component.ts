import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {StoryLog} from "../interface/story-log";
import {DatePipe} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {StoryLogDialogComponent} from "../story-log-dialog/story-log-dialog.component";
import {ConfirmCancelDialogComponent} from "../../helpers/confirm-cancel-dialog.component";

@Component({
  selector: 'app-story-log-item',
  standalone: true,
  imports: [
    DatePipe,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './story-log-item.component.html',
  styleUrl: './story-log-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryLogItemComponent {

  #dialog = inject(MatDialog);

  @Input({required: true}) storyLog: StoryLog | undefined;

  editStoryLog() {
    this.#dialog.open(StoryLogDialogComponent, {
      width: '600px',
      disableClose: true,
      data: this.storyLog
    });
  }

  deleteStoryLog() {
    const dialogRef = this.#dialog.open(ConfirmCancelDialogComponent, {
      data: {message: 'Are you sure you want to delete this story log?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Delete story log')
        console.log(this.storyLog)
      }
    });

    // TODO: Implement delete functionality
  }
}
