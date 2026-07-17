import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './status-chip.html',
  styleUrl: './status-chip.scss'
})
export class StatusChip {

  @Input()
  text = '';

  @Input()
  color:
    | 'green'
    | 'blue'
    | 'orange'
    | 'red'
    | 'purple'
    | 'gray'
    = 'gray';

}