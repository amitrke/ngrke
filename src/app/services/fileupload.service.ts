import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class FileuploadService {

  private serviceURL = environment.awsFileServiceURL;
  public imageListCache = [];

  constructor(private http: HttpClient) { }

  postFile(base64data: any, fileName: string, file: File): Observable<any> {
    this.imageListCache = [];
    const postBody = {
      data: base64data,
      name: fileName,
      size: file.size,
      type: file.type
    };
    return this.http.post(this.serviceURL, postBody);
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
