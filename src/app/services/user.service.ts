import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { UserEntity } from '../entity/user.entity';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private serviceURL = environment.serviceURL + 'users/';

  constructor(private http: HttpClient) { }

  public cachedUser: UserEntity;

  get(id: String): Observable<any> {
    return this.http.get(this.serviceURL + id)
        .pipe(
          catchError(this.handleError)
        );
  }

  search(user: UserEntity): Observable<any> {
      return this.http.post(this.serviceURL + 'search', user)
        .pipe(
          catchError(this.handleError)
      );
  }

  create(user: UserEntity): Observable<any> {
    return this.http.post(this.serviceURL, user)
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
