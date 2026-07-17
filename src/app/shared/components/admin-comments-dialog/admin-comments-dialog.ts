import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-comments-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './admin-comments-dialog.html',
  styleUrl: './admin-comments-dialog.scss'
})
export class AdminCommentsDialog {

  private fb = inject(NonNullableFormBuilder);

  readonly dialogRef =
    inject(MatDialogRef<AdminCommentsDialog>);

  readonly data =
    inject(MAT_DIALOG_DATA);

  form = this.fb.group({

    adminComments: [
      '',
      Validators.required
    ]

  });

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }

    this.dialogRef.close(
      this.form.getRawValue().adminComments
    );

  }

  cancel(): void {

    this.dialogRef.close();

  }

}