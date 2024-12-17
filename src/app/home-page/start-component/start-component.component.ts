import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SingleCurrentWeather } from '../../models/single-current-weather';
import { ClimaService } from '../../core/service/weather.service';
import { ConvertingService } from '../../core/service/converting.service';
import { BookMarkService } from '../../core/service/bookmark.service';
@Component({
  selector: 'app-start-component',
  templateUrl: './start-component.component.html',
  styleUrl: './start-component.component.css'
})
export class StartComponentComponent implements OnInit{
    
  form!: FormControl;

  iconUrl = '';

  _weather!: SingleCurrentWeather;
  temp!: number;
  feelsLike!: number;

  isLoading = false;
  isError = false;
  isAdd = true;

  ngOnInit(): void {
      this.form = new FormControl('', Validators.required);
  }

  constructor(private service: ClimaService, private convert: ConvertingService, private bookmarkService: BookMarkService){
    this.convert.unitObs.subscribe({
      next: ()=> {
        if(this._weather){
          this.convertWeather()
        }
      }
    })
  }


  search(value: string){
    if(value){
      this.isLoading = true;
      this.service.returnSingleWeather(value).subscribe(
        {next: (data)=>{
          const iconCode = data.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          this.iconUrl = iconUrl;
          console.log(data);
          console.log(iconUrl);
          this.isLoading = false;
          this.isError = false;
          this._weather = data;
          this.temp = data.main.temp;
          this.feelsLike = data.main.feels_like;
          this.checkIfInList();
          this.convertWeather();
        },
        error: ()=> {
          this.isLoading = false;
          this.isError = true;
        }});

    }
    
  }

  get unitSymbol(): string{
    return this.convert.unitSymbol;
  }

  convertWeather(){
    
    this._weather.main.temp = this.convert.getTemp(this.temp);
    this._weather.main.feels_like = this.convert.getTemp(this.feelsLike);
  }

  doAddOrRemove(){
    if(this.isAdd){
      this.isAdd = false;
      this.addItem();
    }else{
      this.isAdd = true;
      this.removeItem();
    }
    console.log(this.isAdd)
  }

  checkIfInList(){
    const listItem = this.bookmarkService.getBookMarks().filter(item => item === this._weather.name);
    if(listItem.length>0){
      this.isAdd = false;
    }
  }

  private addItem(){
    this.bookmarkService.addBookmark(this._weather.name);
  }

  private removeItem(){
    this.bookmarkService.removeBookmark(this._weather.name);
  }
}
