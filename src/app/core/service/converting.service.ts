import { Injectable } from "@angular/core";
import { SingleCurrentWeather } from "../../models/single-current-weather";
import { SingleWeeklyWeather } from "../../models/single-weekly-weather";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConvertingService{
 
    private _unit = new BehaviorSubject('k');

    unitObs = this._unit.asObservable();

    getTemp(temp: number): number{
    
        return this.getTempUnit(temp);
    }

    getWeeklyWeather(weather: SingleWeeklyWeather): SingleWeeklyWeather{

        weather.main.temp = this.getTempUnit(weather.main.temp);
        return weather;
    }

    private getTempUnit(temp: number): number{

        console.log(this.unit + 'unit')
        if(this.unit=='c'){
            return temp-273.15
        }else if (this.unit=='f'){
            return ((temp-273.15)/5)*9 + 32; //mathematic expression from kelvin to farenheitn
        }else{
            return temp;
        }
    }

    set unit(unit: string){
        this._unit.next(unit)
    }

    get unit(){
        return this._unit.getValue();
    }

    get unitSymbol(): string{
        if(this.unit == 'k'){
          return ' K';
        }else if(this.unit == 'c'){
          return ' C°';
        }else{
          return ' °F';
        }
      }
    
}