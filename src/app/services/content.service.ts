import { Injectable } from '@angular/core';
import { ContentEntity } from '../entity/content.entity';
import { Response, Http, RequestOptionsArgs} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Injectable()
export class ContentService {

  private serviceURL = 'https://us-central1-myrke-189201.cloudfunctions.net/';

  constructor(private http: HttpClient) {
  }
/*
  list(): Promise<ContentEntity[]> {
    return this.http.post('https://us-central1-myrke-189201.cloudfunctions.net/list', '{"kind":"Content","select":["description"]}')
       .toPromise()
        .then(response => response.json() as ContentEntity[])
        .catch(this.handleError);
  }
*/
  get(id: String): Observable<any> {
    const body = {'kind': 'Content', 'key': 'iitr'};
    const httpOptions = { 'headers': {'Content-Type': 'application/json'}};

    return this.http.post(this.serviceURL + 'get', body, httpOptions)
        .pipe(
          retry(1),
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
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
