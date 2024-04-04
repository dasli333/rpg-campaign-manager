import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  #snackBar = inject(MatSnackBar);

  constructor() { }

  openSnackBar(message: string) {
    this.#snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'custom-snackbar'
    });
  }
}
