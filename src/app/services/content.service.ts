import { Injectable } from '@angular/core';
import { ContentEntity } from '../entity/content.entity';
import { Response, Http, RequestOptionsArgs} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class ContentService {

  private serviceURL = environment.serviceURL + 'content/';

  constructor(private http: HttpClient) {
  }

  get(id: String): Observable<any> {
    return this.http.get(this.serviceURL + id)
        .pipe(
          catchError(this.handleError)
        );
  }

  list(): Observable<any> {
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
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
}
