import { Injectable } from '@angular/core';
import { ContentEntity } from '../entity/content.entity';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ContentService extends BaseService<ContentEntity> {

  public editObject = new ContentEntity(undefined, undefined, undefined, undefined);

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'articles');
  }

  public getHomePosts = async (): Promise<ContentEntity[]> => {
    console.log('Method not implemented');
    return undefined;
  }

  public awsSearch(entity: ContentEntity): Observable<any> {
    return this.doAwsGet(`${environment.awsServiceURL}/Post/q/${JSON.stringify(entity)}`);
  }

  public awsGet(id: String): Observable<any> {
    return this.doAwsGet(`${environment.awsServiceURL}/Post/${id}`);
  }
}
