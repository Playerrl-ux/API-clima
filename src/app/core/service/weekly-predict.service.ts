import { Inject, Injectable } from "@angular/core";
import { ClimaService } from "./weather.service";
import { SingleWeeklyWeather } from "../../models/single-weekly-weather";
import { filter, Observable } from "rxjs";
import { WeeklyPredict } from "../../models/weekly-predict";
import { map } from 'rxjs/operators';
import { SingleCurrentWeather } from "../../models/single-current-weather";


 @Injectable({
    providedIn: 'root'
 })
 export class WeeklyPredictService{
    
    constructor(private service: ClimaService){}

    return5DaysPredict(lat: string, lon: string): Observable<WeeklyPredict>{
        
        return this.service.returnWeeklyPredict(lat, lon).pipe(
            map((data: WeeklyPredict) => {

                const filtered = data.list.
                    filter((element: SingleWeeklyWeather) => element.dt_txt[12]==='2');
                return {...data, list:filtered}})
        )
    }

    return5DaysPredictByName(name: string): Observable<WeeklyPredict>{
        
        return this.service.returnWeeklyPredictByName(name).
        pipe(
            map((data: WeeklyPredict) => {
                const filtered = data.list.
                    filter((element: SingleWeeklyWeather) => element.dt_txt[12]==='2');
                return {...data, list:filtered}})
        )
    }

    returnSingleWeather(param: {name: string} | {lat: string, lon: string}): Observable<SingleCurrentWeather>{
        
        if("name" in param){
            return this.service.returnSingleWeather(param.name);
        }else{
            return this.service.returnSingleWeatherByCoord(param.lat, param.lon);
        }
    }

    
 }