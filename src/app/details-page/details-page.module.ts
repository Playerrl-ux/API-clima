import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponentComponent } from './details-component/details-component.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: DetailsComponentComponent}
]

@NgModule({
  declarations: [
    DetailsComponentComponent,
    WeatherDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class DetailsPageModule { }
