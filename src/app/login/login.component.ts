import { Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef
 } from '@angular/core';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../services/user.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
      this.loggedInUser = this.userService.getCachedUser('user')[0];
      this.userService.setCachedUser(this.loggedInUser);
    }
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

    const user: UserEntity = UserEntity.instanceFromGoogle(googleUser);

    const keys = await this.userService.getAWSAuthKeys(googleUser.getAuthResponse().id_token).toPromise();
    await this.userService.setAWSCachedUser(
      keys.AssumeRoleWithWebIdentityResponse.AssumeRoleWithWebIdentityResult.Credentials.AccessKeyId,
      keys.AssumeRoleWithWebIdentityResponse.AssumeRoleWithWebIdentityResult.Credentials.SecretAccessKey,
      keys.AssumeRoleWithWebIdentityResponse.AssumeRoleWithWebIdentityResult.Credentials.SessionToken,
      user
    );
    const existingUser = await this.userService.getAWSUser(user);

    if (existingUser) {
      this.setLoggedInUserFlags(googleUser.getAuthResponse().id_token, existingUser);
    } else {
      const newUser = await this.userService.createAWSUser(user);
      if (newUser) {
        console.log('User should have been created by now');
        this.setLoggedInUserFlags(googleUser.getAuthResponse().id_token, newUser);
      } else {
        console.log('Error creating new user');
      }
    }
  }

  setLoggedInUserFlags = (idtoken: string, user: UserEntity) => {
    this.loggedInUser = user;
    this.loggedIn = true;
    this.loginEvent.emit(user);
    this.changeDetectorRef.detectChanges();
  }
}
