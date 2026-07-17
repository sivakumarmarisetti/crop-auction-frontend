import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {
  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  value!: string | number;

  @Input()
  subtitle = '';

  @Input()
  icon = 'dashboard';

  @Input()
  iconBackground = '#EFF6FF';

  @Input()
  iconColor = '#2563EB';
  
  @Output()
  cardClick = new EventEmitter<void>();

  onClick(): void {
    this.cardClick.emit();
  }
}
