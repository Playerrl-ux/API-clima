import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CitiesService } from '../../core/service/cities.service';
import { catchError, debounce, debounceTime, distinctUntilChanged, Observable, of, startWith, Subscribable, subscribeOn, switchMap } from 'rxjs';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent{

  selectedCar!: string;

  cars!: {id: number, name: string}[];

  @Output() change = new EventEmitter<string>();


  constructor(private service: CitiesService){}

  search(query: string): void{

    of(query)
      .pipe(
        debounceTime(300), // Aguarda 300ms para evitar requisições excessivas
        distinctUntilChanged(), // Ignora valores repetidos
        switchMap((searchTerm) => this.service.getFilteredItems(searchTerm))
      )
      .subscribe((data) => {
        this.cars = data;
      });
  }

  onChange(query: {id: number, name: string}): void{
    if(query){
      this.change.emit(query.name);
    }
  }



}
