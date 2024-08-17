import { Routes } from '@angular/router';
import { DashboardComponent } from './components/workspace/dashboard/dashboard.component';
import { EuropeComponent } from './components/continents/europe.component';
import { AsiaComponent } from './components/continents/asia.component';
import { AmericaComponent } from './components/continents/america.component';
import { OceaniaComponent } from './components/continents/oceania.component';
import { AfricaComponent } from './components/continents/africa.component';

export const routes: Routes = [
    {
        path: '', redirectTo:"/Dashboard", pathMatch: 'full',
    },
    {
        path: 'Dashboard', component: DashboardComponent,
    },
    {
        path: 'Europe', component: EuropeComponent,
    },
    {
        path: 'Asia', component: AsiaComponent,
    },
    {
        path: 'America', component: AmericaComponent,
    },
    {
        path: 'Oceania', component: OceaniaComponent,
    },
    {
        path: 'Africa', component: AfricaComponent,
    },
];
