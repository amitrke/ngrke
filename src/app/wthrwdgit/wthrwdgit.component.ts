import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wthrwdgit',
  templateUrl: './wthrwdgit.component.html',
  styleUrls: ['./wthrwdgit.component.scss']
})
export class WthrwdgitComponent implements OnInit {

  private serviceURL = 'https://api.openweathermap.org/data/2.5/weather?id=1258044&APPID=f7af9edbf84cf616933e7bb4ef2820ca&units=metric';

  public dataAvailable;

  public data;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.dataAvailable = true;
    }, error => {
      console.log('An error occurred while calling the web-service');
    });
  }

  getData(): Observable<any> {
    return this.http.get(this.serviceURL)
        .pipe(
          catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable();
  }

}
