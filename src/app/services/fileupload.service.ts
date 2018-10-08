import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class FileuploadService {

  private serviceURL = environment.serviceURL + 'image/';
  public uploadBaseFolder = 'upload/users/';

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File, fileName: string): Observable<any> {
    return this.http.post(this.serviceURL, fileToUpload,
      { headers: {'filename': fileName, 'enctype': 'multipart/form-data'}, reportProgress: true});
  }

  listFiles(folder: string): Observable<any> {
    return this.http.get(this.serviceURL, { headers: {'folder': folder}});
  }

  delete(filename: string): Observable<any> {
    return this.http.delete(this.serviceURL, {headers: {'filename': filename}});
  }
}
