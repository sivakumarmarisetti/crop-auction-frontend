import { Component } from '@angular/core';

import {
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-approve-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './approve-dialog.html',
  styleUrl: './approve-dialog.scss'
})
export class ApproveDialog {

  constructor(
    private dialogRef: MatDialogRef<ApproveDialog>
  ) {}

  cancel(): void {

    this.dialogRef.close(false);

  }

  approve(): void {

    this.dialogRef.close(true);

  }

}