import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {StoryLog} from "../interface/story-log";
import {CampaignsService} from "../../campaigns/campaigns.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmCancelDialogComponent} from "../../helpers/confirm-cancel-dialog.component";

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
  #dialog = inject(MatDialog);
  #dialogRef = inject(MatDialogRef<StoryLogDialogComponent>);
  #snackBar = inject(MatSnackBar);


  addStoryLogForm = this.#formBuilder.group({
    entry: ''
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: StoryLog | undefined) {
    if (data) {
      this.addStoryLogForm.patchValue(data);
    }
  }

  addStoryLog() {
    if (!this.addStoryLogForm.value.entry) return;
    const storyLog: StoryLog = {entry: this.addStoryLogForm.value.entry}
    if (this.data) {
      this.#campaignService.updateStoryLog({...this.data, ...storyLog}).subscribe(() => this.openSnackBar('Story log updated'));
    } else {
      this.#campaignService.addStoryLog(storyLog).subscribe(() => this.openSnackBar('Story log added'));
    }
    this.addStoryLogForm.reset();
    this.#dialogRef.close();
  }

  onCancel() {
    const dialogRef = this.#dialog.open(ConfirmCancelDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.#dialogRef.close();
      }
    });
  }

  private openSnackBar(message: string) {
    this.#snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'custom-snackbar'
    });
  }
}
