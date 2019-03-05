import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements AfterViewInit {

  constructor(private userService: UserService) { }

  public status: boolean;

  ngAfterViewInit() {
    if (this.userService.getCachedUser('idtoken') !== undefined) {
      this.userService.removeCachedUser();
      gapi.auth2.getAuthInstance().signOut();
      this.status = true;
    } else {
      this.status = false;
    }
  }

}
