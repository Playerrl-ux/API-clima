import { Component, Input } from '@angular/core';
import { SingleWeeklyWeather } from '../../models/single-weekly-weather';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css'
})
export class WeatherDetailsComponent {

  @Input() weather!: SingleWeeklyWeather;
  @Input() iconUrl!: string;
  @Input() iconSymbol!: string;
}
