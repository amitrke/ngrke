import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { UserEntity } from '../entity/user.entity';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService extends BaseService<UserEntity> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'users');
  }

  public setCachedUser(idtoken: string, user: UserEntity) {
    localStorage.setItem('idtoken', idtoken);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expiry', JSON.stringify(new Date().getTime()));
  }

  public removeCachedUser() {
    localStorage.clear();
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
