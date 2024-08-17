import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContinentComponent as ContinentComponent } from '../continent.component';
import { MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BarChartComponent } from '../charts/bar-chart.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-europe',
  standalone: true,
  imports: [    
    CommonModule,
    ContinentComponent,
    BarChartComponent,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule],
  templateUrl: '../continent.component.html',
  styleUrl: '../continent.component.css'
})
export class EuropeComponent extends ContinentComponent {
  public override id = "Europe";
}
