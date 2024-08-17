import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BarChartComponent } from '../charts/bar-chart.component';
import { FormsModule } from '@angular/forms';
import { ContinentComponent } from '../continent.component';

@Component({
  selector: 'app-america',
  standalone: true,
  imports: [    
    CommonModule,
    BarChartComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule],
  templateUrl: '../continent.component.html',
  styleUrl: '../continent.component.css'

})
export class AmericaComponent extends ContinentComponent {
  public override id = "America";
}
