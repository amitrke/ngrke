import { Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef
 } from '@angular/core';
import { UserEntity, UserSocial } from '../entity/user.entity';
import { UserService } from '../services/user.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { GoogleSignInSuccess } from '../google-signin/google-signin.component';
import { environment } from '../../environments/environment';

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
    if (this.userService.cachedUser) {
      this.setUser(this.userService.cachedUser);
    }
    this.userService.cachedUserChange.subscribe(value => {
      this.setUser(value);
    });
  }

  setUser = (user: UserEntity) => {
    this.loggedIn = true;
    this.loggedInUser = user;
  }

  onSelectedTabChange(event: MatTabChangeEvent) {
    this.selectedTab.setValue(event.index);
  }

  onNavToTabRequest(event) {
    this.selectedTab.setValue(event);
  }

  onGoogleSignInSuccess = async(event: GoogleSignInSuccess) => {
    const googleUser: gapi.auth2.GoogleUser = event.googleUser;
    console.log('idtoken=' + googleUser.getAuthResponse().id_token);
    const authToken = await this.userService.getAuthToken(googleUser.getAuthResponse().id_token).toPromise();
    await this.userService.setApiToken(authToken.token);

    const social = new UserSocial(googleUser.getBasicProfile().getEmail(),
            undefined, undefined, googleUser.getBasicProfile().getImageUrl());
    const socials = [];
    socials.push(social);

    await this.setLoggedInUser(new UserEntity(
      'Unknown', socials, environment.website, googleUser.getBasicProfile().getName(),
      new Date(), new Date(), authToken.userid
    ));
  }

  private setLoggedInUser = async (user: UserEntity) => {
    this.loggedInUser = user;
    this.loggedIn = true;
    this.loginEvent.emit(user);
    this.changeDetectorRef.detectChanges();
    const currUserGqlResp = await this.userService.getCurrUser();
    const currUser: UserEntity = currUserGqlResp.data.user;
    user.files = currUser.files;
    user.posts = currUser.posts;
    this.userService.setCachedUser(user);
  }
}
