import { SingleWeeklyWeather } from "./single-weekly-weather";

export interface WeeklyPredict{
    city: {name: string},
    list : SingleWeeklyWeather[]
}