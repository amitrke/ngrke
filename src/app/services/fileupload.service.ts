import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class FileuploadService {

  private serviceURL = environment.serviceURL + 'image/';
  public uploadBaseFolder = 'assets/img/users/';

  constructor(private http: HttpClient) { }

  postFile(fileToUpload: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(this.serviceURL, formData, { headers: {'filename': fileName}});
  }

  listFiles(folder: string): Observable<any> {
    return this.http.get(this.serviceURL, { headers: {'folder': folder}});
  }

  delete(filename: string): Observable<any> {
    return this.http.delete(this.serviceURL, {headers: {'filename': filename}});
  }
}
