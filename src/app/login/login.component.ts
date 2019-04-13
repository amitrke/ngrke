import { Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef
 } from '@angular/core';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../services/user.service';
import { MatTabChangeEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { GoogleSignInSuccess } from '../google-signin/google-signin.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private myClientId = '670134176077-h5g5nn6catjdo2uoo36d5eji03ccf186.apps.googleusercontent.com';
  @Output() loginEvent = new EventEmitter<UserEntity>();

  public loggedIn = false;
  public loggedInUser: UserEntity;
  public selectedTab = new FormControl(0);

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.userService.getCachedUser('idtoken') != null) {
      this.loggedIn = true;
      this.loggedInUser = this.userService.getCachedUser('user');
    }
  }

  onSelectedTabChange(event: MatTabChangeEvent) {
    this.selectedTab.setValue(event.index);
  }

  onNavToTabRequest(event) {
    this.selectedTab.setValue(event);
  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    const googleUser: gapi.auth2.GoogleUser = event.googleUser;
    const id: string = googleUser.getId();
    const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    console.log('idtoken=' + googleUser.getAuthResponse().id_token);
    this.userService.tokensignin(googleUser.getAuthResponse().id_token).subscribe(value => {
      const user: UserEntity = new UserEntity(id, profile.getName(),
           profile.getEmail(), profile.getImageUrl(), undefined);
           user.id = Number.parseInt(value.response);
      this.setLoggedInUserFlags(googleUser.getAuthResponse().id_token, user);
    }, error => {
      console.log('Error token stuff');
    });
  }

  setLoggedInUserFlags(idtoken: string, user: UserEntity) {
    this.userService.setCachedUser(idtoken, user);
    this.loggedInUser = user;
    this.loggedIn = true;
    this.loginEvent.emit(user);
    this.changeDetectorRef.detectChanges();
  }
}
