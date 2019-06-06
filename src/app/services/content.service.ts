import { Injectable } from '@angular/core';
import { ContentEntity } from '../entity/content.entity';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ContentService extends BaseService<ContentEntity> {

  public editObject = new ContentEntity(undefined, undefined, undefined, undefined, undefined);

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'articles');
  }

  public awsSearch(entity: ContentEntity): Observable<any> {
    return this.doAwsGet(`${environment.awsServiceURL}/Post/q/{"webid":"${environment.website}","status":"published"}`);
  }
}
