import {
  Component,
  Inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

export interface ConfirmationDialogData {

  title: string;

  message: string;

  confirmText: string;

  confirmColor?: 'primary' | 'accent' | 'warn';

}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss'
})
export class ConfirmationDialog {

  constructor(

    public dialogRef:
      MatDialogRef<ConfirmationDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmationDialogData

  ) {}

  cancel(): void {

    this.dialogRef.close(false);

  }

  confirm(): void {

    this.dialogRef.close(true);

  }

}