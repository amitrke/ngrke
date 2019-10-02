import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

@Injectable()
export class FileuploadService {

  private serviceURL = environment.awsFileServiceURL;
  public imageListCache = [];

  constructor(private apollo: Apollo, httpLink: HttpLink) {
    try {
      apollo.create({
        link: httpLink.create({ uri: environment.graphqlServerURL }),
        cache: new InMemoryCache()
      });
    } catch {}
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
      const response = await this.apollo.mutate<{ETag: string}>({
        mutation: uploadGql
      }).toPromise();
      return response.data;
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  }

  public listFiles = async (userid: string): Promise<{Key: string, ETag: string}[]> => {
    try {
      const response = await this.apollo.query<{getFilesList: {Key: string, ETag: string}[]}>({
        query: gql`{
           getFilesList(user:"${userid}", env: "${environment.env}"){
            ETag,
            Key
          }
      }`
      }).toPromise();
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
