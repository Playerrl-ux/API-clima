export interface SingleCurrentWeather{
    
    name: string,
    weather: [{main: string, icon: string, description: string}],
    main: {
        temp: number,
        feels_like: number,
        humidity: number
    },
    wind: {speed: number},
    coord: {lon: number, lat: number}
}