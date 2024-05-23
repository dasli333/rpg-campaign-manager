import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <div mat-dialog-content>
      <p>{{data?.message || 'You are about to delete this item.'}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDeleteDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string} | undefined) {}
}
