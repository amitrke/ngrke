import { Component, OnInit } from '@angular/core';
import { MailEntity } from '../entity/mail.entity';
import { MailService } from '../services/mail.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  constructor(
    private mailService: MailService,
    public snackBar: MatSnackBar
  ) { }

  model = new MailEntity('admin@roorkee.org', 'Admin Roorkee.org', 'Contact us form submit', 'Not Implemented', undefined);

  ngOnInit() {
  }

  onSubmit() {
    this.mailService.sendEmail(this.model, 'NotImplemented').subscribe(data => {
      this.snackBar.open('Communication sent', undefined, {
        duration: 2000,
      });
    },
    error => {
      console.log(error);
    });
  }
}
