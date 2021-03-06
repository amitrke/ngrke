import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserEntity } from '../entity/user.entity';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { AWSCredentials } from '../entity/awscredentials.entity';
import { query } from 'gql-query-builder';

@Injectable()
export class UserService extends BaseService<UserEntity> {

  private awsAuthURL = 'https://sts.amazonaws.com/?Action=AssumeRoleWithWebIdentity&DurationSeconds=3600' +
                      '&RoleSessionName=rke-web-users&RoleArn=arn:aws:iam::975848467324:role/rke-web-users' +
                      '&WebIdentityToken=#TOKEN#&Version=2011-06-15';

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'User');
  }

  cachedUserChange: Subject<UserEntity> = new Subject<UserEntity>();

  /**
   * @deprecated
   */
  public setAWSAPIKeys = async(accessKeyId: string, secretAccessKey: string, sessionToken: string) => {
    console.warn('Calling deprecated function!');
    this.awsCredentials = new AWSCredentials(accessKeyId, secretAccessKey, sessionToken);
    localStorage.setItem('AccessKeyId', accessKeyId);
    localStorage.setItem('SecretAccessKey', secretAccessKey);
    localStorage.setItem('SessionToken', sessionToken);
    localStorage.setItem('expiry', JSON.stringify(new Date().getTime()));
  }

  public setApiToken = async(token: string) => {
    localStorage.setItem('ApiToken', token);
    localStorage.setItem('tokenUpdateTime', (new Date()).getTime().toString());
  }

  public setCachedUser = (user: UserEntity) => {
    this.cachedUser = user;
    if (localStorage.getItem('user')) {
      const usrObj: UserEntity = JSON.parse(localStorage.getItem('user'));
      if (usrObj.id === user.id) {
        let updateHappened = false;
        if (user.files) {
          usrObj.files = user.files;
          updateHappened = true;
        }
        if (user.posts) {
          usrObj.posts = user.posts;
          updateHappened = true;
        }
        if (updateHappened) {
          localStorage.setItem('user', JSON.stringify(usrObj));
          console.log('userService: cachedUser details updated');
        }
        return;
      }
    }
    localStorage.setItem('user', JSON.stringify(user));
    console.log('userService: cachedUser updated');
    this.cachedUserChange.next(user);
  }

  public removeCachedUser() {
    localStorage.clear();
  }

  /**
   * @deprecated
   */
  public getAWSAuthKeys(idtoken: string): Observable<any> {
    console.warn('Calling deprecated function!');
    const awsAuth = this.awsAuthURL.replace('#TOKEN#', idtoken);
    return this.httpClient.get(awsAuth)
    .pipe(
      catchError(this.handleError)
    );
  }

  public getAuthToken = (idtoken: string): Observable<any> => {
    const headers = new HttpHeaders({'Authorization':idtoken});
    return this.httpClient.post(`${environment.graphqlServerURL}/../login`, "", {headers: headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * @deprecated
   */
  public setAWSAuthKeys = async(idtoken: string) => {
    console.warn('Calling deprecated function!');
    const keys = await this.getAWSAuthKeys(idtoken).toPromise();

  }

  /**
   * @deprecated
   */
  getAWSUser = async(user: UserEntity) => {
    console.warn('Calling deprecated function!');
    const res = await this.getAWSClient().fetch(
          `${environment.awsServiceURL}/User/q/{"social.email":"${user.getEmail()}","webid":"${environment.website}"}`,
           {}
          );
    return res.json();
  }

  /**
   * @deprecated
   */
  createAWSUser = async(user: UserEntity) => {
    console.warn('Calling deprecated function!');
    const res = await this.getAWSClient().fetch(
          `${environment.awsServiceURL}/User`, {
            method: 'PUT',
            body: JSON.stringify(user)
          });
    return res.json();
  }

  public tokensignin(idtoken: string): Observable<any> {
    return this.httpClient.get(
                            environment.serviceURL + '../tokensignin',
                            { headers: {'token': idtoken}}
                          )
            .pipe(
              catchError(this.handleError)
            );
  }

  public search = async (entity: UserEntity): Promise<any> => {
    const gqlQuery = query({
      operation: 'getUser',
      variables: {
        email: {value: entity.getEmail(), required: true},
        webid: {value: environment.website, required: true}
      },
      fields: ['id', 'name', {'social': ['email', 'type', 'profilePic']}]
    });
    return this.doGqlPost(gqlQuery);
  }

  public getCurrUser = async (): Promise<any> => {
    const gqlQuery = query({
      operation: 'user',
      fields: ['id', {'social': ['email', 'type']}, {'files': ['Key', 'ETag']}, {'posts': ['id', 'title', 'images', 'description']}]
    });
    return this.doGqlPost(gqlQuery);
  }
}
