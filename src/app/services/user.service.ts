import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserEntity } from '../entity/user.entity';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { AWSCredentials } from '../entity/awscredentials.entity';

@Injectable()
export class UserService extends BaseService<UserEntity> {

  private awsAuthURL = 'https://sts.amazonaws.com/?Action=AssumeRoleWithWebIdentity&DurationSeconds=3600' +
                      '&RoleSessionName=rke-web-users&RoleArn=arn:aws:iam::975848467324:role/rke-web-users' +
                      '&WebIdentityToken=#TOKEN#&Version=2011-06-15';

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'User');
  }

  cachedUserChange: Subject<UserEntity> = new Subject<UserEntity>();

  public setAWSAPIKeys = async(accessKeyId: string, secretAccessKey: string, sessionToken: string) => {
    this.awsCredentials = new AWSCredentials(accessKeyId, secretAccessKey, sessionToken);
    localStorage.setItem('AccessKeyId', accessKeyId);
    localStorage.setItem('SecretAccessKey', secretAccessKey);
    localStorage.setItem('SessionToken', sessionToken);
    localStorage.setItem('expiry', JSON.stringify(new Date().getTime()));
  }

  public setCachedUser = (user: UserEntity) => {
    this.cachedUser = user;
    localStorage.setItem('user', JSON.stringify(user));
    console.log('userService: cachedUser updated');
    this.cachedUserChange.next(user);
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

  public setAWSAuthKeys = async(idtoken: string) => {
    const keys = await this.getAWSAuthKeys(idtoken).toPromise();

  }

  getAWSUser = async(user: UserEntity) => {
    const res = await this.getAWSClient().fetch(
          `${environment.awsServiceURL}/User/q/{"social.email":"${user.getEmail()}","webid":"${environment.website}"}`,
           {}
          );
    return res.json();
  }

  createAWSUser = async(user: UserEntity) => {
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

  public search = async (entity: UserEntity): Promise<UserEntity[]> => {
    const res = await this.getAWSClient().fetch(
      `${this.serviceURL}/q/{"webid":"${environment.website}","social.email":"${entity.getEmail()}"}`,
        {}
      );
    return res.json();
  }
}
