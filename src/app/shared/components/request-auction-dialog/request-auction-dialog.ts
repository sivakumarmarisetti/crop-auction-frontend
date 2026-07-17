import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-request-auction-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './request-auction-dialog.html',
  styleUrl: './request-auction-dialog.scss'
})
export class RequestAuctionDialog {

  private fb = inject(FormBuilder);

  readonly dialogRef =
    inject(MatDialogRef<RequestAuctionDialog>);

  readonly data =
    inject<{ cropId: number; cropName: string }>(MAT_DIALOG_DATA);

  form = this.fb.group({

    farmerRemarks: ['']

  });

  submit(): void {

    this.dialogRef.close({

      cropId: this.data.cropId,

      farmerRemarks:
        this.form.value.farmerRemarks ?? ''

    });

  }

  cancel(): void {

    this.dialogRef.close();

  }

}