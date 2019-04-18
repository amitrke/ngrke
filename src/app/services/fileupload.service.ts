import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class FileuploadService {

  private serviceURL = environment.serviceURL + 'image/';
  public uploadBaseFolder = 'upload/users/';
  public imageListCache = [];

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File, fileName: string): Observable<any> {
    this.imageListCache = [];
    const idtoken = this.getCachedUser('idtoken');
    return this.http.post(this.serviceURL, fileToUpload,
      { headers: {'filename': fileName, 'enctype': 'multipart/form-data', 'idtoken': idtoken}
      , reportProgress: true});
  }

  listFiles(folder: string): Observable<any> {
    const idtoken = this.getCachedUser('idtoken');
    return this.http.get(this.serviceURL, { headers: {'folder': folder, 'idtoken': idtoken}});
  }

  delete(filename: string): Observable<any> {
    this.imageListCache = [];
    const idtoken = this.getCachedUser('idtoken');
    return this.http.delete(this.serviceURL, {headers: {'filename': filename, 'idtoken': idtoken}});
  }

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
}
