import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss'
})
export class EmptyState {

  @Input()
  icon = '📄';

  @Input()
  title = 'No Data Found';

  @Input()
  subtitle = 'There is nothing to display.';

}