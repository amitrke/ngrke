import { Injectable } from '@angular/core';
import { ContentEntity } from '../entity/content.entity';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class ContentService extends BaseService<ContentEntity> {

  public editObject = new ContentEntity(undefined, undefined, undefined, undefined, undefined);

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'articles');
  }

}
