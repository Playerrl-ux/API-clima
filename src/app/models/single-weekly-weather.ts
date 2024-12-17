export interface SingleWeeklyWeather{
    
    sunrise: number,
    sunset: number,
    main: {temp: number, humidity: number},
    dt: number,
    dt_txt: string
    weather: [{
        description: string,
        icon: string
    }],
    wind: {speed: number}
}