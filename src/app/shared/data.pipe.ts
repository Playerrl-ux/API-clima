import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DataPipe implements PipeTransform {

  transform(value: string): string {
    
    const date = new Date(value.replace(' ', 'T'));
    const options: Intl.DateTimeFormatOptions = {day: '2-digit', month: 'short', weekday: 'long'};
    console.log('aqui')
    return date.toLocaleDateString('pt-br', options);
  }  

}
