import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../component/component.component';
import { WeatherViewComponent } from './weather-view/weather-view.component';
import { DataPipe } from './data.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';




@NgModule({
  declarations: [
    HeaderComponent,
    WeatherViewComponent,
    DataPipe,
    AutocompleteComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  exports: [
    HeaderComponent,
    WeatherViewComponent,
    DataPipe,
    AutocompleteComponent
  ]
})
export class SharedModule { }
