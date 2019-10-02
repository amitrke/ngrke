import { Injectable } from '@angular/core';
import { ContentEntity } from '../entity/content.entity';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

@Injectable()
export class ContentService extends BaseService<ContentEntity> {

  public editObject = new ContentEntity(undefined, undefined, undefined, undefined);

  constructor(private httpClient: HttpClient, private apollo: Apollo, httpLink: HttpLink) {
    super(httpClient, 'articles');
    try {
      apollo.create({
        link: httpLink.create({ uri: environment.graphqlServerURL }),
        cache: new InMemoryCache()
      });
    } catch {}
  }

  public getHomePosts = async (): Promise<ContentEntity[]> => {
    try {
      let response = await this.apollo.query<{getPosts: ContentEntity[]}>({
        query: gql`{
           getPosts(webid:"${environment.website}"){
             id, title, images, description
          }
      }`
      }).toPromise();
      return response.data.getPosts;
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  }

  public awsSearch(entity: ContentEntity): Observable<any> {
    return this.doAwsGet(`${environment.awsServiceURL}/Post/q/${JSON.stringify(entity)}`);
  }

  public awsGet(id: String): Observable<any> {
    return this.doAwsGet(`${environment.awsServiceURL}/Post/${id}`);
  }
}
