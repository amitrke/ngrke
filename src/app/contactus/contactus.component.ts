import { Component, OnInit } from '@angular/core';
import { MailEntity } from '../entity/mail.entity';
import { MailService } from '../services/mail.service';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  constructor(
    private mailService: MailService,
    public snackBar: MatSnackBar,
    private userService: UserService,
  ) { }

  model = new MailEntity(undefined, 'admin@roorkee.org', 'Admin Roorkee.org', 'Contact us form submit', undefined, undefined);

  ngOnInit() {
  }

  onSubmit() {
    if (this.userService.cachedUser == null) {
      this.snackBar.open('You must be logged in to send communication', undefined, {
        duration: 4000,
      });
      return;
    }
    this.model.fromUserId = this.userService.cachedUser.id;
    this.model.htmlBody = this.createMailBody();
    this.mailService.sendEmail(this.model).subscribe(data => {
      this.snackBar.open('Communication sent', undefined, {
        duration: 4000,
      });
      this.model = new MailEntity(
        undefined, 'admin@roorkee.org', 'Admin Roorkee.org', 'Contact us form submit', undefined, undefined);
    },
    error => {
      console.log(error);
      this.snackBar.open(error.error.message, undefined, {
        duration: 6000,
      });
      this.model = new MailEntity(
        undefined, 'admin@roorkee.org', 'Admin Roorkee.org', 'Contact us form submit', undefined, undefined);
    });
  }

  createMailBody() {
    let content = '<h3>Contact Us communication sent from roorkee.org</h3>';
    content += '<img src=\'' + this.userService.cachedUser.imageURL + '\'>';
    content += '<p>From:' + this.userService.cachedUser.name + '(' + this.userService.cachedUser.email + ')</p>';
    content += '<p>' + this.model.textBody + '</p>';
    content += '<p>Local time:' + new Date() + '</p>';
    return content;
  }
}
