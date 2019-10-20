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

    try {
      const social = new UserSocial(googleUser.getBasicProfile().getEmail(), undefined, undefined, undefined);
      const socials = [];
      socials.push(social);
      const userSearchCriteria = new UserEntity(undefined, socials, environment.website, undefined, undefined, undefined);
      const existingUser = await this.userService.search(userSearchCriteria);
      if (existingUser && existingUser.length > 0) {
        this.setLoggedInUserFlags(existingUser[0]);
      } else {
        const googleUserEntity: UserEntity = UserEntity.instanceFromGoogle(googleUser);
        await this.registerNewUser(googleUserEntity);
      }
    } catch (err) {
      console.error(`loginComponent: Error making API request to fetch user details ${err}`);
    }
  }

  private registerNewUser = async(user: UserEntity) => {
    try {
      const newUser = await this.userService.createAWSUser(user);
      this.setLoggedInUserFlags(newUser);
    } catch (err) {
      console.error(`loginComponent: Error file registering user ${err}`);
    }
  }

  setLoggedInUserFlags = (user: UserEntity) => {
    this.loggedInUser = user;
    this.loggedIn = true;
    this.loginEvent.emit(user);
    this.changeDetectorRef.detectChanges();
    this.userService.setCachedUser(user);
  }
}
