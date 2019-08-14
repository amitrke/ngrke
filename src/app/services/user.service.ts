import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserEntity } from '../entity/user.entity';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { AwsClient } from 'aws4fetch';
import { AWSCredentials } from '../entity/awscredentials.entity';

@Injectable()
export class UserService extends BaseService<UserEntity> {

  private awsAuthURL = 'https://sts.amazonaws.com/?Action=AssumeRoleWithWebIdentity&DurationSeconds=3600' +
                      '&RoleSessionName=rke-web-users&RoleArn=arn:aws:iam::975848467324:role/rke-web-users' +
                      '&WebIdentityToken=#TOKEN#&Version=2011-06-15';

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'users');
  }

  private awsClient: AwsClient;
  private awsCredentials: AWSCredentials;

  public setCachedUser(idtoken: string, user: UserEntity) {
    localStorage.setItem('idtoken', idtoken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expiry', JSON.stringify(new Date().getTime()));
    this.cachedUser = user;
  }

  public setAWSCachedUser = async(accessKeyId: string, secretAccessKey: string, sessionToken: string, user: UserEntity) => {
    this.awsCredentials = new AWSCredentials(accessKeyId, secretAccessKey, sessionToken);
    localStorage.setItem('AccessKeyId', accessKeyId);
    localStorage.setItem('SecretAccessKey', secretAccessKey);
    localStorage.setItem('SessionToken', sessionToken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expiry', JSON.stringify(new Date().getTime()));
    if (this.cachedUser === undefined) {
      this.cachedUser = user;
    }
  }

  public getAWSCachedUser(): AWSCredentials {
    if (this.awsCredentials === undefined && localStorage.getItem('AccessKeyId')) {
      console.log('Reading aws credentials from local storage');
      this.awsCredentials.AccessKeyId = localStorage.getItem('AccessKeyId');
      this.awsCredentials.SecretAccessKey = localStorage.getItem('SecretAccessKey');
      this.awsCredentials.SessionToken = localStorage.getItem('SessionToken');
    }
    return this.awsCredentials;
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

  private getAWSClient(): AwsClient {
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

  getAWSUser = async(user: UserEntity) => {
    const res = await this.getAWSClient().fetch(
          `${environment.awsServiceURL}/User/q/{"social.email":"${user.email}","webid":"${environment.website}"}`,
           {}
          );
    return res.json();
  }

  createAWSUser = async(user: UserEntity) => {
    const postBody = {
      name: user.name,
      type: 'pr-user',
      created: new Date(),
      lastLogin: new Date(),
      webid: environment.website,
      social: [
        {
          id: user.gid, type: 'gl', email: user.email, profilePic: user.imageURL
        }
      ]
    }
    const res = await this.getAWSClient().fetch(
          `${environment.awsServiceURL}/User`, {
            method: 'PUT', 
            body: JSON.stringify(postBody)
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
}
