import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import gql from 'graphql-tag';
import { BaseService } from './base.service';
import { PhotogalleryEntity } from '../entity/photogallery.entity';

@Injectable()
export class FileuploadService extends BaseService<PhotogalleryEntity> {

  // private serviceURL = environment.awsFileServiceURL;
  public imageListCache = [];
  constructor(http: HttpClient) {
    super(http, undefined);
  }

  public postFile = async (base64data: any, fileName: string, file: File): Promise<{ETag: string}> => {
    try {
      const uploadGql = gql`
          mutation uploadFile {
            uploadFile(fileData:"${base64data}", name: "${fileName}"){
              ETag
            }
          }
      `;
      const response = this.doGqlPost(uploadGql);
      // const response = await this.apollo.mutate<{ETag: string}>({
      //   mutation: uploadGql
      // }).toPromise();
      return response;
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  }

  public listFiles = async (userid: string): Promise<{Key: string, ETag: string}[]> => {
    try {
      const reqBody = `{ "query": "{ getFilesList(user: \\\"${userid}\\\", env:\\\"${environment.env}\\\") { Key, ETag  } }" }`;
      const response = await this.doGqlPost(reqBody);
      return response.data.getFilesList;
    } catch (err) {
      console.error(JSON.stringify(err));
    }
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
