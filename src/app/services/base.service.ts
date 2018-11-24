import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseEntity } from '../entity/base.entity';

export class BaseService<T extends BaseEntity> {

    private serviceURL: string;

    constructor(
        private http: HttpClient,
        private service: string) {
            this.serviceURL = environment.serviceURL + service + '/';
    }

    public get(id: String): Observable<any> {
        return this.doGet(this.serviceURL + id);
    }

    public list(): Observable<any> {
        return this.doGet(this.serviceURL);
    }

    public search(entity: T): Observable<any> {
        return this.doPost(this.serviceURL + 'search', entity);
    }

    public save(entity: T): Observable<any> {
        return this.doPost(this.serviceURL, entity);
    }

    private doGet(url: string): Observable<any> {
        return this.http.get(url)
            .pipe(
              catchError(this.handleError)
            );
    }

    private doPost(url: string, entity: T): Observable<any> {
        return this.http.post(url, entity).pipe(
            catchError(this.handleError)
        );
    }

    protected handleError(error: HttpErrorResponse) {
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
