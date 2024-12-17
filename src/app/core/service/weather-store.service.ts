import { Injectable } from "@angular/core";
import { WeeklyPredict } from "../../models/weekly-predict";

@Injectable({
    providedIn: 'root'
})
export class WeatherStorage{

    weather!: WeeklyPredict;

}