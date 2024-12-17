import { Component, OnInit } from '@angular/core';
import { BookMarkService } from '../../core/service/bookmark.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent implements OnInit{

    itensList!: string[];

    constructor(private service: BookMarkService, private router: Router){}

    ngOnInit(): void {
      this.service.bookmarks$.subscribe(bookmark => {
        this.itensList = bookmark;
      })
    }

    goToDetails(item: string){
      this.router.navigateByUrl('/details/' + item);
    }

    removeItem(item: string){
      this.service.removeBookmark(item);
    }

    addItem(item: string){
      const filtered = this.service.getBookMarks().
        filter(element => element === item);
      if(filtered.length == 0){
        this.service.addBookmark(item);
      }
    }
}    

    
