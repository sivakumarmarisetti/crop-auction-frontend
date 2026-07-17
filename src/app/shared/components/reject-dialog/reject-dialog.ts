import { Component } from '@angular/core';

import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reject-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './reject-dialog.html',
  styleUrl: './reject-dialog.scss'
})
export class RejectDialog {

  constructor(
    private dialogRef: MatDialogRef<RejectDialog>
  ) {}

  cancel(): void {

    this.dialogRef.close(false);

  }

  reject(): void {

    this.dialogRef.close(true);

  }

}