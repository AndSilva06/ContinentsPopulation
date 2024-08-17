import { ChangeDetectorRef, Component, Input } from '@angular/core';
import Chart, { Colors } from 'chart.js/auto';
import { Population } from '../../types/Continent';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  @Input() data!: Population[];
  @Input() public graphName!: string;
  public chart: Chart | undefined;
  private options = {
            plugins: {
             legend: {
              display: false
             }
            },
            aspectRatio:2.5
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    if (Object.keys(this.data).length > 0) {
      const labels = this.data.map((key: Population) => (key.label));
      const data = this.data.map((key: Population) => (key.data))
      this.chart = new Chart(this.graphName, {
          type: 'bar',
          data: {
            labels: labels, 
            datasets: [{
              data: data,
            }]
          },
          options: this.options
        });
      }
      this.changeDetectorRef.detectChanges();    
  }

  ngOnChanges() {
    if(this.chart) {
      const labels = this.data.map((key: Population) => (key.label));
      const data = this.data.map((key: Population) => (key.data))
      this.chart.data = {
          labels: labels, 
          datasets: [{
            data: data,
          }]
        }
      this.chart.update();
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
