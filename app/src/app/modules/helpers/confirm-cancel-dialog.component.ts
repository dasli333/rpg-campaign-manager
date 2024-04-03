import {Component, Inject} from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions, MatDialogClose, MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-cancel-dialog',
  standalone: true,
  template: `
    <h1 mat-dialog-title>Confirm</h1>
    <div mat-dialog-content>
      <p>{{data?.message || 'Are you sure you want to cancel?'}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </div>
  `,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ]
})
export class ConfirmCancelDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string} | undefined) {
  }
}
