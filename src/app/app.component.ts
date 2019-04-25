import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Roorkee';
  public buildInfo = environment.website + '-' + environment.build;
  constructor(public userService: UserService) {}
}
