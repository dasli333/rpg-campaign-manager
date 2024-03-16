import {Component, Inject} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-delete-campaign-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <div mat-dialog-content>
      <p>You are about to delete this campaign.</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button (click)="onYesClick()">Yes</button>
    </div>
  `,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ]
})
export class DeleteCampaignDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCampaignDialogComponent>
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close('confirm');
  }
}
