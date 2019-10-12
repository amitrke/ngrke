import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import gql from 'graphql-tag';
import { BaseService } from './base.service';
import { PhotogalleryEntity } from '../entity/photogallery.entity';
import { query, mutation } from 'gql-query-builder';

@Injectable()
export class FileuploadService extends BaseService<PhotogalleryEntity> {

  public imageListCache = [];

  constructor(http: HttpClient) {
    super(http, undefined);
  }

  public postFile = async (base64data: any, fileName: string, file: File): Promise<any> => {
    try {
      const uploadMutation = mutation({
        operation: 'uploadFile',
        variables: {
          fileData: {value: base64data, required: true},
          name: {value: fileName, required: true}
        },
        fields: ['ETag']
      });
      this.imageListCache = [];
      return this.doGqlPost(uploadMutation);
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  }

  public listFiles = async (userid: string): Promise<any> => {
    const gqlQuery = query({
      operation: 'getFilesList',
      variables: {
        user: {value: userid, required: true},
        env: {value: environment.env, required: true}
      },
      fields: ['Key', 'ETag']
    });
    return this.doGqlPost(gqlQuery);
  }

  public deleteFiles = async (key: string): Promise<any> => {
    const deleteMutation = mutation({
      operation: 'deleteFile',
      variables: {
        id: {value: key, required: true}
      },
      fields: ['deleteMarker']
    });
    return this.doGqlPost(deleteMutation);
  }

  delete(filename: string): Observable<any> {
    /*
    this.imageListCache = [];
    const idtoken = this.getCachedUser('idtoken');
    return this.http.delete(this.serviceURL, {headers: {'filename': filename, 'idtoken': idtoken}});
    */
    return new Observable();
  }

  /*
  public getCachedUser(attribute: string): any {
    if (localStorage.length > 0 && localStorage.getItem('expiry') != null) {
      const expiry: number = Number.parseInt(localStorage.getItem('expiry'));
      const now = new Date().getTime();
      if ((now - expiry) < 3600000 && localStorage.getItem(attribute) != null) {
        try {
          return JSON.parse(localStorage.getItem(attribute));
        } catch (e) {
          return localStorage.getItem(attribute);
        }
      }
    }
    return null;
  }
  */
}
