import { Component,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef
 } from '@angular/core';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../services/user.service';

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

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.userService.cachedUser != null) {
      console.log('There is a cached user ');
      this.loggedIn = true;
      this.loggedInUser = this.userService.cachedUser;
    }
  }

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    const googleUser: gapi.auth2.GoogleUser = event.googleUser;
    const id: string = googleUser.getId();
    const profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();

    this.userService.get(profile.getId()).subscribe(value => {
        if (value) {
          this.setLoggedInUserFlags(value);
        }
      }, error => {
        if (error) {
          console.log('In error block, registering user');
          this.registerUser(profile);
        }
      }
    );
  }

  setLoggedInUserFlags(user: UserEntity) {
    this.userService.cachedUser = user;
    this.loggedInUser = user;
    this.loggedIn = true;
    this.loginEvent.emit(user);
    this.changeDetectorRef.detectChanges();
  }

  registerUser(profile: gapi.auth2.BasicProfile) {
    const user: UserEntity = new UserEntity(
      profile.getId(),
      profile.getName(),
      profile.getEmail(),
      profile.getImageUrl(),
      'User'
    );
    this.userService.create(user).subscribe(value => {
      if (value) {
        console.log('Registration complete');
        this.setLoggedInUserFlags(user);
      }
    }, error => {
      if (error) {
        console.log ('Could not register the user:' + console.dir(error));
      }
    });
  }
}
