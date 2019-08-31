import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from './services/user.service';
import { environment } from '../environments/environment';
import { UserEntity } from './entity/user.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Roorkee';
  public buildInfo = environment.website + '-' + environment.build;
  public user: UserEntity;

  constructor(public userService: UserService) {}

  ngOnInit() {
    console.log('appComponent: onInit');
    this.user = this.userService.cachedUser;
    this.userService.cachedUserChange.subscribe(value => {
      console.log('appComponent: User Change detected');
      this.user = value;
    });
  }


}
