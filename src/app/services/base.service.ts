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

    public delete(id: string): Observable<any> {
        return this.http.delete(this.serviceURL + id).pipe(
            catchError(this.handleError)
          );
    }

    protected doGet(url: string): Observable<any> {
        let idtoken = this.getCachedUser('idtoken');
        idtoken = idtoken != null ? idtoken : '';
        return this.http.get(url, { headers: {'idtoken': idtoken}})
            .pipe(
              catchError(this.handleError)
            );
    }

    protected doPost(url: string, entity: T): Observable<any> {
        let idtoken = this.getCachedUser('idtoken');
        idtoken = idtoken != null ? idtoken : '';
        return this.http.post(url, entity, { headers: {'idtoken': idtoken}}).pipe(
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

      public getCachedUser(attribute: string): any {
        if (localStorage.length > 0 && localStorage.getItem('expiry') != null) {
          const expiry: number = Number.parseInt(localStorage.getItem('expiry'));
          const now = new Date().getTime();
          if ((now - expiry) < 3600000 && localStorage.getItem(attribute) != null) {
            try {
              return JSON.parse(localStorage.getItem(attribute));
            } catch (e) {
              return localStorage.getItem(attribute);
            }
          }
        }
        return null;
      }
}
