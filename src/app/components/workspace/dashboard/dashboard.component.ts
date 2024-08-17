import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ContinentsService } from '../../../services/continents.service';
import { BarChartComponent } from '../../charts/bar-chart.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Population } from '../../../types/Continent';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-dash',
  templateUrl: './dashboard.component.html',
  styleUrl: '../../continent.component.css',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    BarChartComponent,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class DashboardComponent {
  public continentsLoaded: Promise<boolean>;
  public continentsPopulation: Population[] = []; 
  public inputValue: any;
  public id = "Dashboard";
  populationInputUpdate = new Subject<string>();


  constructor(private continentsService: ContinentsService) {
    this.continentsLoaded = Promise.resolve(false);
    //Add a small delay to wait the user finish input
    this.populationInputUpdate.pipe(
        debounceTime(300),
        distinctUntilChanged()).subscribe(value => {
          this.continentsPopulation = [];
          Object.entries(this.continentsService.getContinents()).forEach(element => {
            const sumPopulation = element[1].data.reduce((partialSum: number, a: any) => partialSum + a.population, 0);
            if( sumPopulation >= this.inputValue) {
              this.continentsPopulation.push({label: element[1].label, data:sumPopulation});
            }
          });
        })
    this.continentsService.getRegions().subscribe((results:any) => {
      if(Object.keys(results).length > 0) {
        this.continentsPopulation.push({label:'Africa', data: results['Africa'].data.reduce((partialSum: number, a: any) => partialSum + a.population, 0) });
        this.continentsPopulation.push({label:'America', data: results['America'].data.reduce((partialSum: number, a: any) => partialSum + a.population, 0) });
        this.continentsPopulation.push({label:'Asia', data: results['Asia'].data.reduce((partialSum: number, a: any) => partialSum + a.population, 0) });
        this.continentsPopulation.push({label:'Europe', data: results['Europe'].data.reduce((partialSum: number, a: any) => partialSum + a.population, 0) });
        this.continentsPopulation.push({label:'Oceania', data: results['Oceania'].data.reduce((partialSum: number, a: any) => partialSum + a.population, 0) });
        
        this.continentsLoaded = Promise.resolve(true);
      }
    })
  }
}
