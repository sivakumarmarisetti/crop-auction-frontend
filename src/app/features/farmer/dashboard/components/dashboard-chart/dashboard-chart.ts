import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import { FarmerDashboardResponseModel } from '../../../models/farmer-dashboard-response.model';

Chart.register(
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-chart.html',
  styleUrl: './dashboard-chart.scss'
})
export class DashboardChart
  implements AfterViewInit, OnChanges {

  @Input()
  dashboard?: FarmerDashboardResponseModel;

  @ViewChild('chart')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart?: Chart;

  ngAfterViewInit(): void {

    this.renderChart();

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['dashboard']) {

      this.renderChart();

    }

  }

  private renderChart(): void {

    if (!this.chartCanvas || !this.dashboard) {

      return;

    }

    this.chart?.destroy();

    this.chart = new Chart(
      this.chartCanvas.nativeElement,
      {
        type: 'doughnut',
        data: {
          labels: [
            'Available',
            'Requested',
            'Sold'
          ],
          datasets: [
            {
              data: [
                this.dashboard.availableCrops,
                this.dashboard.requestedCrops,
                this.dashboard.soldCrops
              ],
              backgroundColor: [
                '#22C55E',
                '#F59E0B',
                '#EF4444'
              ],
              borderWidth: 0
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          },
          cutout: '70%'
        }
      }
    );

  }

}