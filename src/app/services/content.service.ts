import { Injectable } from '@angular/core';
import { ContentEntity } from '../entity/content.entity';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { query } from 'gql-query-builder';

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

  public getMyPosts = async (): Promise<any> => {
    const gqlQuery = query({
      operation: 'myPosts',
      fields: ['id', 'title', 'description', 'images']
    });
    return this.doGqlPost(gqlQuery);
  }

  /**
   * @deprecated
   */
  public awsSearch(entity: ContentEntity): Observable<any> {
    console.warn('Calling deprecated function!');
    return this.doAwsGet(`${environment.awsServiceURL}/Post/q/${JSON.stringify(entity)}`);
  }

  /**
   * @deprecated
   */
  public awsGet(id: String): Observable<any> {
    console.warn('Calling deprecated function!');
    return this.doAwsGet(`${environment.awsServiceURL}/Post/${id}`);
  }
}
