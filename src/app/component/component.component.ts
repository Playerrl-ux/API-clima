import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConvertingService } from '../core/service/converting.service';

@Component({
  selector: 'app-header',
  templateUrl: './component.component.html',
  styleUrl: './component.component.css'
})
export class HeaderComponent implements OnInit{

  actualId = 'k';
  @ViewChild('buttons', {static: true}) buttons!: ElementRef;
  
  constructor(private service: ConvertingService){}
  
  ngOnInit(): void {
    
  }
  
  setUnit(event: Event){
    const button = event.target as HTMLButtonElement;
    this.actualId = button.id;
    this.service.unit = this.actualId;
    Array.from(this.buttons.nativeElement.children).forEach(element =>{
      (element as HTMLButtonElement).style.backgroundColor = 'rgb(30 41 59)'
    })
    button.style.backgroundColor = 'rgb(7 89 133)';
    console.log(this.service.unit);
  }

}
