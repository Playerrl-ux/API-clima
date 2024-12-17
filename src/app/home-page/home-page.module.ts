import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { StartComponentComponent } from './start-component/start-component.component';
import { BookmarkComponent } from '../bookmark-page/bookmark/bookmark.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {path: '', component: StartComponentComponent}
  
]

@NgModule({
  declarations: [
    StartComponentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class HomePageModule { }
