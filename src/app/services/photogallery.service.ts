import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { PhotogalleryEntity } from '../entity/photogallery.entity';

@Injectable({
  providedIn: 'root'
})
export class PhotogalleryService extends BaseService<PhotogalleryEntity> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, 'photogallery');
  }

}
