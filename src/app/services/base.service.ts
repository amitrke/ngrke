import { environment } from '../../environments/environment';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseEntity } from '../entity/base.entity';
import { UserEntity } from '../entity/user.entity';
import { AwsClient, AwsV4Signer } from 'aws4fetch';
import { AWSCredentials } from '../entity/awscredentials.entity';

export class BaseService<T extends BaseEntity> {

  /*
   * Deprecated.
   */
  protected serviceURL: string;

  public cachedUser: UserEntity;
  private awsClient: AwsClient;
  protected awsCredentials: AWSCredentials;

  constructor(
      private http: HttpClient,
      private service: string) {
          this.serviceURL = `${environment.awsServiceURL}/${service}`;
  }

  /**
   * @deprecated
   */
  protected getAWSCachedUser = (): AWSCredentials => {
    console.warn('Calling deprecated function!');
    if (this.awsCredentials === undefined && localStorage.getItem('AccessKeyId')) {
      console.log('Reading aws credentials from local storage');
      this.awsCredentials = new AWSCredentials(
        localStorage.getItem('AccessKeyId'),
        localStorage.getItem('SecretAccessKey'),
        localStorage.getItem('SessionToken')
      );
    }
    return this.awsCredentials;
  }

  /**
   * @deprecated
   */
  protected getAWSClient = (): AwsClient => {
    console.warn('Calling deprecated function!');
    if (this.awsClient === undefined) {
      const awsCred = this.getAWSCachedUser();
      this.awsClient = new AwsClient(
        {
          accessKeyId: awsCred.AccessKeyId,
          secretAccessKey: awsCred.SecretAccessKey,
          sessionToken: awsCred.SessionToken,
          region: 'us-east-1',
          'service': 'execute-api'
        });
      return this.awsClient;
    } else {
      return this.awsClient;
    }
  }

  /**
   * @deprecated
   */
  protected getAwsV4Signer = (url: string, method: string, datetime: string): AwsV4Signer => {
    console.warn('Calling deprecated function!');
    const awsCred = this.getAWSCachedUser();
    return new AwsV4Signer(
      {
        url: url,
        datetime: datetime,
        accessKeyId: awsCred.AccessKeyId,
        secretAccessKey: awsCred.SecretAccessKey,
        sessionToken: awsCred.SessionToken,
        region: 'us-east-1',
        'service': 'execute-api'
      });
  }

  public get(id: String): Observable<any> {
      return this.doGet(this.serviceURL + id);
  }

  public list(): Observable<any> {
      return this.doGet(this.serviceURL);
  }

  public search = async (entity: T): Promise<T[]> => {
    entity.webid = environment.website;
    const res = await this.getAWSClient().fetch(
      `${this.serviceURL}q/${JSON.stringify(entity)}}`,
        {}
      );
    return res.json();
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

  protected doAwsGet(url: string): Observable<any> {
    return this.http.get(url)
        .pipe(
          catchError(this.handleError)
        );
  }

  protected doGqlPost = async(gqlRequest: {variables: any, query: string}): Promise<any> => {
    const apiToken = localStorage.getItem('ApiToken');
    try {
      return this.http.post(
        environment.graphqlServerURL,
        JSON.stringify(gqlRequest), {
          headers: {'Authorization': apiToken}
        }).toPromise();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /**
   * @deprecated
   */
  protected doPost(url: string, entity: T): Observable<any> {
    console.warn('Calling deprecated function!');
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
    if (localStorage.length > 0 && localStorage.getItem('tokenUpdateTime') && localStorage.getItem('ApiToken') && localStorage.getItem('user') ) {
      const tokenUpdateTime: number = Number.parseInt(localStorage.getItem('tokenUpdateTime'), 10);
      const now = new Date().getTime();
      if ((now - tokenUpdateTime) < 3600000 && localStorage.getItem(attribute) != null) {
        try {
          const obj = JSON.parse(localStorage.getItem(attribute));
          if (attribute === 'user') {
            this.cachedUser = obj;
          }
          return obj;
        } catch (e) {
          return localStorage.getItem(attribute);
        }
      }
    }
    return undefined;
  }
}
