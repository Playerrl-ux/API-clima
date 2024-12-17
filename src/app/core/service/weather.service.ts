import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SingleCurrentWeather } from "../../models/single-current-weather";
import { HttpClient, HttpParams } from "@angular/common/http";
import { WeeklyPredict } from "../../models/weekly-predict";

@Injectable({
    providedIn: 'root'
})
export class ClimaService{

    constructor(private http: HttpClient){}

    apiUrl = 'https://api.openweathermap.org/data/2.5/';

    apiKey = '81ab6e2458fc3c4c6fbbc7dd9578619a';

    returnSingleWeather(cityName: string): Observable<SingleCurrentWeather>{
        const params = new HttpParams()
            .set('q', cityName)
            .set('appid', this.apiKey)
            .set('lang', 'pt_br');

        return this.http.get<SingleCurrentWeather>(this.apiUrl+"weather", {params});

    }

    returnSingleWeatherByCoord(lat: string, lon: string): Observable<SingleCurrentWeather>{
        const params = new HttpParams()
            .set('lat', lat)
            .set('lon', lon)
            .set('appid', this.apiKey)
            .set('lang', 'pt_br');

        return this.http.get<SingleCurrentWeather>(this.apiUrl+"weather", {params});

    }

    returnWeeklyPredict(lat: string, lon: string): Observable<WeeklyPredict>{
        const params = new HttpParams()
            .set('lat', lat)
            .set('lon', lon)
            .set('lang', 'pt_br')
            .set('appid', this.apiKey);

        return this.http.get<any>(this.apiUrl+"forecast", {params})
    }

    returnWeeklyPredictByName(name: string): Observable<WeeklyPredict>{
        const params = new HttpParams()
            .set('q', name)
            .set('lang', 'pt_br')
            .set('appid', this.apiKey);

        return this.http.get<any>(this.apiUrl+"forecast", {params})
    }

}