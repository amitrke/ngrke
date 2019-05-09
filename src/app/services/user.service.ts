import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserEntity } from '../entity/user.entity';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService extends BaseService<UserEntity> {

  private awsAuthURL = 'https://sts.amazonaws.com/?Action=AssumeRoleWithWebIdentity&DurationSeconds=3600' +
                      '&RoleSessionName=rke-web-users&RoleArn=arn:aws:iam::975848467324:role/rke-web-users' +
                      '&WebIdentityToken=#TOKEN#&Version=2011-06-15';

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'users');
  }

  public setCachedUser(idtoken: string, user: UserEntity) {
    localStorage.setItem('idtoken', idtoken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expiry', JSON.stringify(new Date().getTime()));
    this.cachedUser = user;
  }

  public setAWSCachedUser(accessKeyId: string, secretAccessKey: string, sessionToken: string, user: UserEntity) {
    localStorage.setItem('AccessKeyId', accessKeyId);
    localStorage.setItem('SecretAccessKey', secretAccessKey);
    localStorage.setItem('SessionToken', secretAccessKey);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expiry', JSON.stringify(new Date().getTime()));
    if (this.cachedUser === undefined) {
      this.cachedUser = user;
    }
  }

  public removeCachedUser() {
    localStorage.clear();
  }

  public getAWSAuthKeys(idtoken: string): Observable<any> {
    const awsAuth = this.awsAuthURL.replace('#TOKEN#', idtoken);
    return this.httpClient.get(awsAuth)
    .pipe(
      catchError(this.handleError)
    );
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
}
