import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { BarChartComponent } from './charts/bar-chart.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ContinentsService } from '../services/continents.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-continent',
  standalone: true,
  imports: [    
    BarChartComponent,
    CommonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './continent.component.html',
  styleUrl: './continent.component.css'
})
export class ContinentComponent {
  public dataValues:any[] = []; 
  public inputValue: any;
  public id: string = '';
  populationInputUpdate = new Subject<string>();

  constructor(private continentsService: ContinentsService) {
    //Add a small delay to wait the user finish input
    this.populationInputUpdate.pipe(
      debounceTime(300),
      distinctUntilChanged()).subscribe(value => {
        this.dataValues = [];
        this.continentsService.getContinent(this.id).data.map((key:any) => {
          if(key.population >= this.inputValue )
            this.dataValues.push({label:key.name.common, data: key.population});
        });
      })
   }

  ngOnInit() {
    this.continentsService.getContinent(this.id).data.map((key:any) => {
         this.dataValues.push({label:key.name.common, data: key.population});
     });
  }
}
