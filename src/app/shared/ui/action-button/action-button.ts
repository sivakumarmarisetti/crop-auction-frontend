import {
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './action-button.html',
  styleUrl: './action-button.scss'
})
export class ActionButtonComponent {

  @Input()
  label = '';

  @Input()
  icon = '';

  @Input()
  color:
    'primary' |
    'accent' |
    'warn' = 'primary';

}