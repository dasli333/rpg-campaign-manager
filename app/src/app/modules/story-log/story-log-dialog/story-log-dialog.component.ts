import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
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
import {ConfirmCancelDialogComponent} from "../../helpers/confirm-cancel-dialog.component";
import {SnackbarService} from "../../helpers/snackbar.service";

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
  #snackbarService = inject(SnackbarService);

  addStoryLogForm = this.#formBuilder.group({
    entry: ['', Validators.required]
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
      this.#campaignService.updateStoryLog({...this.data, ...storyLog}).subscribe(() => this.#snackbarService.openSnackBar('Story log updated'));
    } else {
      this.#campaignService.addStoryLog(storyLog).subscribe(() => this.#snackbarService.openSnackBar('Story log added'));
    }
    this.addStoryLogForm.reset();
    this.#dialogRef.close();
  }

  onCancel() {
    if (!this.addStoryLogForm.value.entry) {
      this.#dialogRef.close();
      return;
    }
    const dialogRef = this.#dialog.open(ConfirmCancelDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.#dialogRef.close();
      }
    });
  }
}
