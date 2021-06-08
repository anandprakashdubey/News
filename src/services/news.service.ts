import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    private newsURL = 'https://hacker-news.firebaseio.com/v0'
    constructor(private http: HttpClient) {}

    getLatestNews() {
        return this.http.get<any>(`${this.newsURL}/topstories.json`).toPromise();
    }

    getNewsById(Id: number) {
        return this.http.get<any>(`${this.newsURL}/item/${Id}.json?print=pretty`).toPromise();
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}