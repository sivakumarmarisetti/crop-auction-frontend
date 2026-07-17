import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { FarmerService } from '../services/farmer.service';
import { NotificationService } from '../../../core/services/notification.service';
import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'app-add-crop',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './add-crop.html',
  styleUrl: './add-crop.scss'
})
export class AddCrop implements OnInit {

  private fb = inject(NonNullableFormBuilder);
  private farmerService = inject(FarmerService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = false;
  cropId = 0;

  cropForm = this.fb.group({

    cropName: ['', Validators.required],

    category: ['', Validators.required],

    quantity: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    expectedPrice: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    harvestDate: ['', Validators.required],

    description: ['']

  });

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.isEditMode = true;
      this.cropId = Number(id);

      this.loadCrop();

    }

  }

  loadCrop(): void {

    this.farmerService
      .getCropById(this.cropId)
      .subscribe({

        next: (response) => {

          this.cropForm.patchValue({

            cropName: response.data.cropName,
            category: response.data.category,
            quantity: response.data.quantity,
            expectedPrice: response.data.expectedPrice,
            harvestDate: response.data.harvestDate,
            description: response.data.description

          });

        },

        error: (error) => {

          this.notificationService.error(
            error.error?.message ?? 'Unable to load crop.'
          );

          this.router.navigate([
            APP_ROUTES.FARMER.MY_CROPS
          ]);

        }

      });

  }

  save(): void {

    if (this.cropForm.invalid) {

      this.cropForm.markAllAsTouched();

      return;

    }

    const formValue = this.cropForm.getRawValue();

    const request = {

      ...formValue,

      harvestDate: formValue.harvestDate
        ? new Date(formValue.harvestDate)
            .toISOString()
            .split('T')[0]
        : ''

    };

    const request$ = this.isEditMode
      ? this.farmerService.updateCrop(
          this.cropId,
          request
        )
      : this.farmerService.addCrop(
          request
        );

    request$.subscribe({

      next: (response) => {

        this.notificationService.success(
          response.message
        );

        this.router.navigate([
          APP_ROUTES.FARMER.MY_CROPS
        ]);

      },

      error: (error) => {

        this.notificationService.error(

          error.error?.message ??

          (
            this.isEditMode
              ? 'Unable to update crop.'
              : 'Unable to add crop.'
          )

        );

      }

    });

  }

  reset(): void {

    if (this.isEditMode) {

      this.loadCrop();

      return;

    }

    this.cropForm.reset({
      cropName: '',
      category: '',
      quantity: 0,
      expectedPrice: 0,
      harvestDate: '',
      description: ''
    });

  }

}