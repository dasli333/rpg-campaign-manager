import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgClass} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    MatButton,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageUploadComponent {

  @Input() imagePreview: string | ArrayBuffer | null | undefined = null;
  @Input() imageControl = new FormControl();
  @Output() fileSelected = new EventEmitter<File>();
  @Output() removeImage = new EventEmitter<void>();
  @Output() imagePreviewChanged = new EventEmitter<ArrayBuffer | string | null>();

  #changeDetectorRef = inject(ChangeDetectorRef);

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileSelected.emit(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.imagePreviewChanged.emit(reader.result);
        this.#changeDetectorRef.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  onRemoveImage(): void {
    this.removeImage.emit();
    this.imagePreview = null;
  }
}
