import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BookMarkService{

    private bookmarksList = new BehaviorSubject<string[]>(['Campo Grande', 'Cuiabá']);

    bookmarks$ = this.bookmarksList.asObservable();

    addBookmark(item: string){
        const current = this.bookmarksList.getValue();
        this.bookmarksList.next([item, ...current]);
    }

    removeBookmark(item: string){
        const current = this.bookmarksList.getValue();
        const removed = current.filter(element => element!==item);
        this.bookmarksList.next(removed);
    }

    getBookMarks(): string[]{
        return this.bookmarksList.getValue();
    }
}