import {
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './table-card.html',
  styleUrl: './table-card.scss'
})
export class TableCard {

  @Input({ required: true })
  title!: string;

  @Input()
  subtitle = '';

}