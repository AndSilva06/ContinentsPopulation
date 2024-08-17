import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { GroupContinentData } from '../types/Continent';



@Injectable({
  providedIn: 'root'
})
export class ContinentsService {
  private restCountriesApiUrl = "https://restcountries.com/v3.1/";
  public dataValue:BehaviorSubject<any> = new BehaviorSubject([]); 
  private continentsData: GroupContinentData = {};
  private dataLoaded = false;

  constructor(private http: HttpClient) {
    this.getContinentsApiData();
  }

  private getContinentsApiData() {
    forkJoin([
      this.http.get(this.restCountriesApiUrl+"region/africa"),
      this.http.get(this.restCountriesApiUrl+"region/america"),
      this.http.get(this.restCountriesApiUrl+"region/asia"),
      this.http.get(this.restCountriesApiUrl+"region/europe"),
      this.http.get(this.restCountriesApiUrl+"region/oceania")
    ]).subscribe((results:any) => {
      this.continentsData = {
            'Africa': {label: 'Africa', data: results[0] },
            'America': {label: 'America', data: results[1]},
            'Asia': {label: 'Asia', data: results[2]},
            'Europe': {label: 'Europe', data: results[3]},
            'Oceania': {label: 'Oceania', data: results[4]}
      };
      this.dataLoaded = true;
      this.dataValue.next(this.continentsData);
    })
  }

  getRegions() {
    if(!this.dataLoaded) {
      this.getContinentsApiData();
    }
    return this.dataValue.asObservable();
  }

  getContinents() {
    return this.continentsData;
  }

  getContinent(continent: string) {
    return this.continentsData[continent];
  }
}
