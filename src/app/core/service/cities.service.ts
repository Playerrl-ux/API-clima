import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CitiesService{

    private url = 'http://localhost:3000/cities';

    constructor(private http: HttpClient){}

    getFilteredItems(searchTerm: string): Observable<{id: number, name: string}[]> {
        return this.http.get<{id: number, name: string}[]>(`${this.url}?name_like=${searchTerm}&_limit=10`);
    }
}