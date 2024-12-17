import { Component, OnInit } from '@angular/core';
import { WeeklyPredict } from '../../models/weekly-predict';
import { ActivatedRoute } from '@angular/router';
import { WeeklyPredictService } from '../../core/service/weekly-predict.service';
import { ConvertingService } from '../../core/service/converting.service';
import { SingleWeeklyWeather } from '../../models/single-weekly-weather';
import { SingleCurrentWeather } from '../../models/single-current-weather';


@Component({
  selector: 'app-details-component',
  templateUrl: './details-component.component.html',
  styleUrl: './details-component.component.css'
})
export class DetailsComponentComponent implements OnInit{

  weather!: WeeklyPredict;
  originalWeathers!: SingleWeeklyWeather[];
  singleWeather!: {weather: SingleCurrentWeather, original: {temp: number, feelsLike: number}};

  constructor(private service: WeeklyPredictService, private router: ActivatedRoute, 
    private converter: ConvertingService){}

  ngOnInit(): void {
    
    const lon = this.router.snapshot.paramMap.get('lon');
    const lat = this.router.snapshot.paramMap.get('lat');
    const name = this.router.snapshot.paramMap.get('name');
    let obsWeathers;
    let obsSingle;

    if(lat && lon){

      obsWeathers = this.service.return5DaysPredict(lat.toString(), lon.toString());
      obsSingle = this.service.returnSingleWeather({lat, lon});

    }else if(name){

      obsWeathers = this.service.return5DaysPredictByName(name.toString());
      obsSingle = this.service.returnSingleWeather({name});
    }

    obsWeathers?.subscribe({next: data =>{
      this.assignWeather(data);
      this.convertWeathers();
    }  
    });

    obsSingle?.subscribe({next: data =>{
      this.singleWeather = {...this.singleWeather, weather: data}
      const icon = this.singleWeather.weather.weather[0].icon;
      this.singleWeather.weather.weather[0].icon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      this.singleWeather.original = {temp: data.main.temp, feelsLike: data.main.feels_like};
      this.convertSingleWeather();
    }
    })
    this.subscribeOnConverter()
  }

  private assignWeather(data: any){
    
    console.log(data.list)
    this.weather = data;
    this.originalWeathers = JSON.parse(JSON.stringify(this.weather.list));

    this.weather.list.forEach(item => {
      const iconCode = item.weather[0].icon;
      item.weather[0].icon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    })
    console.log(this.weather);
    console.log(this.originalWeathers);
  }

  private subscribeOnConverter(){
    
    this.converter.unitObs.subscribe(
      {next: ()=>{
      console.log(this.originalWeathers)
      this.convertAllWeathers();
    }})
  }

  convertAllWeathers(){
    console.log(this.weather)
    if(this.weather){
      this.convertSingleWeather();
      console.log(this.originalWeathers)
    }
    if(this.singleWeather){
      this.convertWeathers();
    }
  }

  convertWeathers() {
    this.weather.list.forEach((item, index) => 
      item.main.temp = this.converter.getTemp(this.originalWeathers[index].main.temp));
  }

  convertSingleWeather() {
    this.singleWeather.weather.main.temp = this.converter.getTemp(this.singleWeather.original.temp);
    this.singleWeather.weather.main.feels_like = this.converter.getTemp(this.singleWeather.original.feelsLike);
  }

  get unitSymbol(): string{
    return this.converter.unitSymbol;
  }

}
