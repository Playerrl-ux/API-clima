import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SingleCurrentWeather } from '../../models/single-current-weather';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-view',
  templateUrl: './weather-view.component.html',
  styleUrl: './weather-view.component.css'
})
export class WeatherViewComponent {

  @Input() hasDetails = true;
  @Input() weather!: SingleCurrentWeather;
  @Input() iconUrl!: string;
  @Input() unitSymbol!: string;
  @Input() isAdd!: boolean;
  @Input() hasName = true;

  @Output() clickEvent = new EventEmitter();

  constructor(private router: Router){}

  emitClick(){
    this.clickEvent.emit();
  }

  goToDetails(){
    this.router.navigateByUrl('/details/' + this.weather.name);
  }
}
