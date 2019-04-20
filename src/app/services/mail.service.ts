import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MailEntity } from '../entity/mail.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  private serviceURL = environment.serviceURL + 'mail/';
  constructor(private http: HttpClient) { }

  sendEmail(mail: MailEntity): Observable<any> {
    return this.http.post(this.serviceURL + 'out/', mail);
  }
}
